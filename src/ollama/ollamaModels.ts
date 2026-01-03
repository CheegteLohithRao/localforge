const OLLAMA_BASE_URL = 'http://localhost:11434';

export type OllamaModel = {
	name: string;
};

export async function getInstalledModels(): Promise<OllamaModel[]> {
	const response = await fetch(`${OLLAMA_BASE_URL}/api/tags`);

	if (!response.ok) {
		throw new Error('Failed to fetch Ollama models');
	}

	const data = await response.json() as {models?: Array<{name: string}> };

	if (!Array.isArray(data.models)) {
		return [];
	}

	return data.models.map((model: any) => ({
		name: model.name
	}));
}

export async function getDefaultModel(): Promise<string | null> {
	try {
		const models = await getInstalledModels();

		if (models.length === 0) {
			return null;
		}

		//first installed model in list
		return models[0].name;
	} catch {
		// Ollama not running or unreachable
		return null;
	}
}
