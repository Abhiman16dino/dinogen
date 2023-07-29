const vscode = require('vscode');
const genJS = require('./gen');

/**
 * @param {vscode.ExtensionContext} context
 */
  function activate(context) {

	console.log('Congratulations, your extension "dinogen" is now active!');

	let disposable = vscode.commands.registerCommand('dinogen.helloWorld', async function () {
		//vscode.window.showInformationMessage('Hello World from DinoGen!');

		//Get the active editor
		const editor = vscode.window.activeTextEditor;

		if(editor){
			const selectedText = editor.document.getText(editor.selection);

				vscode.window.withProgress(
					{
						location: vscode.ProgressLocation.Window,
						cancellable: false,
						title: "Genrating data..."
					}, async (progress) => {
						progress.report({increment: 0});
						const data = await genJS.genJS(selectedText);
						console.log(data)
						vscode.window.showInformationMessage(`Response: ${data}`);
						progress.report({increment:100});
					}
				);
		}
	});

	 // Add the context menu item to the editor
	 let disposableContextMenu = vscode.languages.registerCodeActionsProvider('*', {
		provideCodeActions(document, range) {
		  const showSelectedTextAction = new vscode.CodeAction('Show Selected Text', vscode.CodeActionKind.Empty);
		  showSelectedTextAction.command = { command: 'dinogen.helloWorld', title: 'Show Selected Text' };
		  return [showSelectedTextAction];
		}
	  });

	context.subscriptions.push(disposable);
	context.subscriptions.push(disposableContextMenu);
}

function deactivate() {}

module.exports = {
	activate,
	deactivate
}
