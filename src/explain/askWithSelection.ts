import * as vscode from 'vscode';
import { generateWithOllama } from '../ollama/ollamaClient';

const MAX_INPUT_LENGTH = 4000;

export async function askWithSelection(
	instruction: string,
	selectedCode: string,
	outputChannel: vscode.OutputChannel,
	model: string,
	abortSignal?: AbortSignal
): Promise<void> {
	if (!instruction || instruction.trim().length === 0) {
		outputChannel.appendLine('[LocalForge] No instruction provided.');
		return;
	}

	if (!selectedCode || selectedCode.trim().length === 0) {
		outputChannel.appendLine('[LocalForge] No code selected.');
		return;
	}

	if (selectedCode.length > MAX_INPUT_LENGTH) {
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
Instruction:
${instruction}

Code:
${selectedCode}
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
