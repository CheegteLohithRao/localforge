import * as vscode from 'vscode';
import { explainSelection } from './explain/explainSelection';
import { getSelectedModel, selectOllamaModel } from './explain/modelSelection';
import { askWithSelection } from './explain/askWithSelection';


let outputChannel: vscode.OutputChannel;  //Keep this at module level so activate can access it and it has to run many times.
let statusBarItem: vscode.StatusBarItem; // i declared the statusbar for handling long computations or loading handling.


export function activate(context: vscode.ExtensionContext) {


	context.subscriptions.push(
		vscode.commands.registerCommand(
			'localforge.askWithSelection',
			async () => {
				try{
					statusBarItem.text = '$(sync~spin) LocalForge: Working...';

					const editor = vscode.window.activeTextEditor;
					if (!editor) {
						vscode.window.showInformationMessage('No active text editor');
						return;
					}

					const selection = editor.selection;
					const selectedText = editor.document.getText(selection);
					if (!selectedText) {
						vscode.window.showInformationMessage('No selected text');
						return;
					}

					const instruction = await vscode.window.showInputBox({
						prompt: 'Enter a prompt to run on the selected code: ',
						placeHolder: 'e.g. fix bug, fix code, fix errors, explain, optimize,...'
					});

					if (!instruction) return;

					let model = getSelectedModel(context);
					if (!model) {
						model = await selectOllamaModel(context);
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
						'Ollama is not running. Start Ollama and try again.'
					);
				} finally {
					statusBarItem.text = '$(check) LocalForge: Ready';
				}
			}
		)
	);



	statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
	statusBarItem.text = '$(check) LocalForge: Ready';
	statusBarItem.show();

	context.subscriptions.push(statusBarItem);
	context.subscriptions.push(
		vscode.commands.registerCommand(
			'localforge.selectModel',
			() => selectOllamaModel(context)
		)
	);


	outputChannel = vscode.window.createOutputChannel('LocalForge');  //Runs once for creating output channel.

	const disposable = vscode.commands.registerCommand('localforge.explainSelection', 

		async () => {

			await vscode.window.withProgress(
				{
					location: vscode.ProgressLocation.Notification,
					title: "LocalForge",
					cancellable: false
				},
				async () => {
					statusBarItem.text = '$(sync~spin) LocalForge: Working...';

					const editor = vscode.window.activeTextEditor;
					if (!editor){
						vscode.window.showInformationMessage('No active text editor');
						statusBarItem.text = '$(check) LocalForge: Ready';
						return;
					}

					const selection = editor.selection;
					const selectedText = editor.document.getText(selection);
					if (!selectedText) {
						vscode.window.showInformationMessage('No selected text');
						statusBarItem.text = '$(check) LocalForge: Ready';
						return;
					}

					outputChannel.clear();
					outputChannel.show();   // responisble for showing outputchannel.

					let model = getSelectedModel(context);

					if (!model) {
						model = await selectOllamaModel(context);
						if (!model) {
							statusBarItem.text = '$(check) LocalFOrge: Ready';
							return;
						}
					}

					await explainSelection(selectedText, outputChannel, model);
					statusBarItem.text = '$(check) LocalForge: Ready';



				}
			);
		}

);

	context.subscriptions.push(disposable);
}


export function deactivate() {}
