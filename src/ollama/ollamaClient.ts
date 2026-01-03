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
	try {
		const response = await fetch(`${OLLAMA_BASE_URL}/api/generate`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				model,
				prompt,
				stream: true
			}),
			signal: abortSignal
		});

		if (!response.ok || !response.body) {
			throw new Error(`Ollama HTTP error: ${response.status}`);
		}

		const reader = response.body.getReader();
		const decoder = new TextDecoder();

		while (true) {
			const { value, done } = await reader.read();

			if (done) break;

			const chunk = decoder.decode(value, { stream: true });
			const lines = chunk.split('\n').filter(Boolean);

			for (const line of lines) {
				try {
					const data = JSON.parse(line);

					if (data.response) {
						handlers.onToken(data.response);
					}

					if (data.done) {
						handlers.onDone();
						return;
					}
				} catch {
				}
			}
		}

		handlers.onDone();
	} catch (error: any) {
		if (error.name === 'AbortError') {
			return;
		}

		handlers.onError(error instanceof Error ? error : new Error(String(error)));
	}
}
