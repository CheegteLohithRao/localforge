import * as vscode from 'vscode';
import { explainSelection } from './explain/explainSelection';
import { askWithSelection } from './explain/askWithSelection';
import { selectOllamaModel } from './explain/modelSelection';
import { getSelectedModel } from './state/modelState';

let outputChannel: vscode.OutputChannel;
let statusBarItem: vscode.StatusBarItem;

export function activate(context: vscode.ExtensionContext) {
	// Output channel (created once)
	outputChannel = vscode.window.createOutputChannel('LocalForge');
	context.subscriptions.push(outputChannel);

	// Status bar
	statusBarItem = vscode.window.createStatusBarItem(
		vscode.StatusBarAlignment.Left,
		100
	);
	statusBarItem.text = '$(check) LocalForge: Ready';
	statusBarItem.show();
	context.subscriptions.push(statusBarItem);

	// Command: Select Model
	context.subscriptions.push(
		vscode.commands.registerCommand(
			'localforge.selectModel',
			() => selectOllamaModel(context)
		)
	);

	// Command: Ask With Selection
	context.subscriptions.push(
		vscode.commands.registerCommand(
			'localforge.askWithSelection',
			async () => {
				statusBarItem.text = '$(sync~spin) LocalForge: Working...';

				try {
					const editor = vscode.window.activeTextEditor;
					if (!editor) {
						vscode.window.showInformationMessage('No active text editor.');
						return;
					}

					const selectedText = editor.document.getText(editor.selection);
					if (!selectedText) {
						vscode.window.showInformationMessage('No selected text.');
						return;
					}

					const instruction = await vscode.window.showInputBox({
						prompt: 'Enter a prompt to run on the selected code:',
						placeHolder: 'e.g. explain, fix bugs, optimize…'
					});
					if (!instruction) return;

					let model = getSelectedModel(context);
					if (!model) {
						await selectOllamaModel(context);
						model = getSelectedModel(context);
						if (!model) return;
					}

					outputChannel.clear();
					outputChannel.show();

					await askWithSelection(
						instruction,
						selectedText,
						outputChannel,
						model
					);
				} catch (error) {
					vscode.window.showErrorMessage(
						error instanceof Error
							? error.message
							: 'Unexpected LocalForge error.'
					);
				} finally {
					statusBarItem.text = '$(check) LocalForge: Ready';
				}
			}
		)
	);

	// Command: Explain Selection
	context.subscriptions.push(
		vscode.commands.registerCommand(
			'localforge.explainSelection',
			async () => {
				statusBarItem.text = '$(sync~spin) LocalForge: Working...';

				try {
					const editor = vscode.window.activeTextEditor;
					if (!editor) {
						vscode.window.showInformationMessage('No active text editor.');
						return;
					}

					const selectedText = editor.document.getText(editor.selection);
					if (!selectedText) {
						vscode.window.showInformationMessage('No selected text.');
						return;
					}

					let model = getSelectedModel(context);
					if (!model) {
						await selectOllamaModel(context);
						model = getSelectedModel(context);
						if (!model) return;
					}

					outputChannel.clear();
					outputChannel.show();

					await explainSelection(
						selectedText,
						outputChannel,
						model
					);
				} catch (error) {
					vscode.window.showErrorMessage(
						error instanceof Error
							? error.message
							: 'Unexpected LocalForge error.'
					);
				} finally {
					statusBarItem.text = '$(check) LocalForge: Ready';
				}
			}
		)
	);
}

export function deactivate() {}
