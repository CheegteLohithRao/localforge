import * as vscode from 'vscode';
import { explainSelection } from './explain/explainSelection';


let outputChannel: vscode.OutputChannel;  //Keep this at module level so activate can access it and it has to run many times.
let statusBarItem: vscode.StatusBarItem; // i declared the statusbar for handling long computatiobs or loading handling.


export function activate(context: vscode.ExtensionContext) {

	statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
	statusBarItem.text = '$(check) LocalForge: Ready';
	statusBarItem.show();

	context.subscriptions.push(statusBarItem);


	vscode.window.showInformationMessage('LocalForge is now active!');

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
					await explainSelection(selectedText, outputChannel);

					statusBarItem.text = '$(check) LocalForge: Ready';



				}
			);
		}

);

	context.subscriptions.push(disposable);
}


export function deactivate() {}
