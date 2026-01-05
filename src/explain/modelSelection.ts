import * as vscode from 'vscode';
import { getInstalledModels } from '../ollama/ollamaModels';

const MODEL_KEY = 'localforge.selecModel';

export async function selectOllamaModel(
    context: vscode.ExtensionContext
): Promise< string | undefined > {
	try {
		const models = await getInstalledModels();

		if (models.length === 0) {
			vscode.window.showErrorMessage('No Ollama models found, make sure Ollama is running in background.');
		}

		const picked = await vscode.window.showQuickPick(
			models.map(m => ({label: m.name})),
			{placeHolder: 'Select an Ollama model'}
		);

		if (!picked) return;

		await context.globalState.update(MODEL_KEY, picked.label);
		return picked.label;
	} catch (error) {
		vscode.window.showErrorMessage(`Failed to get Ollama models: ${error instanceof Error ? error.message : error}`);
		return undefined;
	}
}

export function getSelectedModel(
    context: vscode.ExtensionContext
): string | undefined {
    return context.globalState.get<string>(MODEL_KEY);
}