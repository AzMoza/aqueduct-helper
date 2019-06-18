// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const cmd = require('child_process');

const model = require('./commands/cmd_model.js')
const controller = require('./commands/cmd_controller.js')
const create = require('./commands/cmd_create.js')
const test = require('./commands/cmd_test.js')
const docs = require('./commands/cmd_docs.js')

const DocsStatusBarItem = require('./components/DocsStatusBar.js');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
async function activate(context) {

	let previousVersion = context.globalState.get("aquPreviousVersion");
	let currentVersion = vscode.extensions.getExtension('azmoza.aqueduct-helper').packageJSON.version;

	if(previousVersion !== currentVersion) {
		let value = await vscode.window.showInformationMessage("Aqueduct Helper has been updated! Check the release notes for more details.", "Show Me", "No Thanks");
		if(value === "Show Me") {
			vscode.env.openExternal("https://marketplace.visualstudio.com/items/AzMoza.aqueduct-helper/changelog")
		}
		context.globalState.update("aquPreviousVersion", currentVersion);
	}

	cmd.exec("aqueduct --version", async (err, stdout) => {
		if(err) {
			let error = await vscode.window.showInformationMessage("Aqueduct is not installed. Woould you like to install it now?", "Yes Please", "No");
			if(error === "Yes Please") {
				cmd.exec("pub global install aqueduct", async (err) => {
					if(err) {
						vscode.window.showErrorMessage("Aqueduct could not be installed");
					} else {
						let tutorial = await vscode.window.showInformationMessage("Aqueduct is installed.", "View Tutorial", "No Thanks");
						if(tutorial === "View Tutorial") {
							vscode.env.openExternal("https://aqueduct.io/docs/tut/getting-started/");
						}
					}
				})
			}
		} else {
			vscode.window.showInformationMessage(`Aqueduct is active at v${stdout.substring(22, stdout.length)}`)
		}
	})
	
	let disposableModelCommand = vscode.commands.registerCommand('extension.aquModel', () => model.command());
	let disposableControllerCommand = vscode.commands.registerCommand('extension.aquController', () => controller.controller());
	let disposableCreatorCommand = vscode.commands.registerCommand('extension.aquCreate', () => create.create());
	let disposableTestCommand = vscode.commands.registerCommand('extension.aquTest', () => test.test());
	let disposableStatusDocsCommand = vscode.commands.registerCommand('extension.aquStatusDocs', () => docs.statusOpenDocs());
	let disposableDocsCommand = vscode.commands.registerCommand('extension.aquDocs', () => docs.commandOpenDocs());

	context.subscriptions.push(disposableModelCommand);
	context.subscriptions.push(disposableControllerCommand);
	context.subscriptions.push(disposableCreatorCommand);
	context.subscriptions.push(disposableTestCommand);
	context.subscriptions.push(disposableStatusDocsCommand);
	context.subscriptions.push(disposableDocsCommand);
	context.subscriptions.push(new DocsStatusBarItem());
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() { }

module.exports = {
	activate,
	deactivate
}
