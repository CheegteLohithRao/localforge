const OLLAMA_BASE_URL = 'http://localhost:11434';

export type OllamaModel = {
	name: string;
};

type OllamaTagsResponse = {
	models?: {
		name: string;
	}[];
};

export async function getInstalledModels(): Promise<OllamaModel[]> {
	let response: Response;

	try {
		response = await fetch(`${OLLAMA_BASE_URL}/api/tags`);
	} catch {
		throw new Error(
			'Cannot connect to Ollama. Is it running on localhost:11434?'
		);
	}

	if (!response.ok) {
		throw new Error(
			`Failed to fetch Ollama models (HTTP ${response.status}).`
		);
	}

	let rawData: unknown;
	try {
		rawData = await response.json();
	} catch {
		throw new Error('Invalid response received from Ollama.');
	}
	if (typeof rawData !== 'object' || rawData === null) {
		return [];
	}

	const data = rawData as OllamaTagsResponse;

	if (!Array.isArray(data.models)) {
		return [];
	}

	return data.models
		.map(model => model.name)
		.filter((name): name is string => typeof name === 'string' && name.length > 0)
		.map(name => ({ name }));
}
