import * as vscode from 'vscode';
import { generateWithOllama } from '../ollama/ollamaClient';

const MAX_INPUT_LENGTH = 4000;

export async function explainSelection(
	input: string,
	outputChannel: vscode.OutputChannel,
	model: string,
	abortSignal?: AbortSignal
): Promise<void> {
	if (!input || input.trim().length === 0) {
		outputChannel.appendLine('[LocalForge] No code selected.');
		return;
	}

	if (input.length > MAX_INPUT_LENGTH) {
		outputChannel.appendLine(
			'[LocalForge] Selection too large for local model.'
		);
		return;
	}

	if (!model) {
		outputChannel.appendLine(
			'[LocalForge] No Ollama model selected.'
		);
		return;
	}

	const prompt = `
Explain the following code clearly and concisely.
Focus on what the code does, not conversational responses.

Code:
${input}
`;

	await generateWithOllama(
		model,
		prompt,
		{
			onToken: (token: string) => {
				outputChannel.append(token);
			},
			onDone: () => {
				outputChannel.appendLine('\n\n— LocalForge');
			},
			onError: (error: Error) => {
				outputChannel.appendLine('\n[LocalForge error]');
				outputChannel.appendLine(error.message);
			}
		},
		abortSignal
	);
}
