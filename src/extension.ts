import * as vscode from 'vscode';

let outputChannel: vscode.OutputChannel;  //Kept this at module level so activate can access it and it has to run many times.

export function activate(context: vscode.ExtensionContext) {


	console.log('LocalForge is now active!');

	outputChannel = vscode.window.createOutputChannel('LocalForge');  //Runs once for creating output channel.

	const disposable = vscode.commands.registerCommand('localforge.explainSelection', () => {
		const editor = vscode.window.activeTextEditor;
		
		if (!editor){
			vscode.window.showInformationMessage('No active text editor');
			return;
		}
		const selection = editor.selection;
		const selectedText = editor.document.getText(selection);
		if (!selectedText) {
			vscode.window.showInformationMessage('No selected text');
			return;
		}
		
		outputChannel.clear();

		outputChannel.appendLine('=====LocalForge=====');
		outputChannel.appendLine('');
		outputChannel.appendLine(`Selected text length: ${selectedText.length} characters`);
		outputChannel.appendLine('');
		outputChannel.appendLine('Selected text preview:');
		outputChannel.appendLine(selectedText);

		outputChannel.show(); // responisble for showing outputchannel.

	}
);

	context.subscriptions.push(disposable);
}


export function deactivate() {}
