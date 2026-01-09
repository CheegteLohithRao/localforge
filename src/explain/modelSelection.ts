import * as vscode from 'vscode';
import { getInstalledModels } from '../ollama/ollamaModels';
import { setSelectedModel } from '../state/modelState';

export async function selectOllamaModel(
	context: vscode.ExtensionContext
): Promise<void> {
	try {
		const models = await getInstalledModels();

		if (models.length === 0) {
			vscode.window.showErrorMessage(
				'No Ollama models found. Make sure Ollama is running.'
			);
			return;
		}

		const picked = await vscode.window.showQuickPick(
			models.map(m => ({ label: m.name })),
			{ placeHolder: 'Select an Ollama model' }
		);

		if (!picked) return;

		await setSelectedModel(context, picked.label);

		vscode.window.showInformationMessage(
			`LocalForge model set to: ${picked.label}`
		);
	} catch (error) {
		vscode.window.showErrorMessage(
			`Failed to get Ollama models: ${
				error instanceof Error ? error.message : String(error)
			}`
		);
	}
}
