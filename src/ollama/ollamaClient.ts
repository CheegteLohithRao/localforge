export type OllamaStreamHandlers = {
	onToken: (token: string) => void;
	onDone: () => void;
	onError: (error: Error) => void;
};

const OLLAMA_BASE_URL = 'http://localhost:11434';

export async function generateWithOllama(
	model: string,
	prompt: string,
	handlers: OllamaStreamHandlers,
	abortSignal?: AbortSignal
): Promise<void> {
	let buffer = '';
	let doneCalled = false;

	const safeDone = () => {
		if (!doneCalled) {
			doneCalled = true;
			handlers.onDone();
		}
	};

	try {
		const response = await fetch(`${OLLAMA_BASE_URL}/api/generate`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ model, prompt, stream: true }),
			signal: abortSignal
		});

		if (!response.ok || !response.body) {
			throw new Error(
				`Failed to connect to Ollama (HTTP ${response.status}). Is Ollama running?`
			);
		}

		const reader = response.body.getReader();
		const decoder = new TextDecoder();

		while (true) {
			const { value, done } = await reader.read();
			if (done) break;

			buffer += decoder.decode(value, { stream: true });

			let newlineIndex;
			while ((newlineIndex = buffer.indexOf('\n')) !== -1) {
				const line = buffer.slice(0, newlineIndex).trim();
				buffer = buffer.slice(newlineIndex + 1);

				if (!line) continue;

				let data;
				try {
					data = JSON.parse(line);
				} catch {
					continue;
				}

				if (typeof data.response === 'string') {
					handlers.onToken(data.response);
				}

				if (data.done === true) {
					safeDone();
					return;
				}
			}
		}

		safeDone();
	} catch (error: any) {
		if (error?.name === 'AbortError') return;

		handlers.onError(
			error instanceof Error
				? error
				: new Error('Unknown Ollama streaming error')
		);
	}
}
