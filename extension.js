// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const fs = require('fs');
const path = require('path');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "aqueduct-snippets" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('extension.aquModel', async function () {
		if(!vscode.workspace.workspaceFolders) {
			return vscode.window.showErrorMessage("Please open a directory before running this command");
		}

		const modelName = await vscode.window.showInputBox({
			prompt: "Model Name"
		});

		if(!modelName) return;

		let property = await vscode.window.showInputBox({
			prompt: "Property Name (Type \"done\" when finished)"
		});

		const properties = [];

		while(property !== 'done') {
			properties.push(property);
			property = await vscode.window.showInputBox({
				prompt: "Property Name (Type \"done\" when finished)"
			});
		}
		const decleration = properties.map(prop => `\t\t@Column(nullable: false) String ${prop};\n`);
		const classContent = `class ${modelName} extends ManagedObject<_${modelName}> implements _${modelName} {}\n\nclass _${modelName} {\n\t${decleration}\n}`;
		
		const folderPath = vscode.workspace.workspaceFolders[0].uri.toString().split(":")[1];

		// TODO: Get this to work currently getting a path error which i believe is something to do with [folderPath]
		fs.writeFile(path.join(folderPath, "model.dart"), classContent, err => {
			if (err) {
			  return vscode.window.showErrorMessage(
				"Failed to create model file!"
			  );
			}
			vscode.window.showInformationMessage("Created model file");
		  });
	});

	context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
