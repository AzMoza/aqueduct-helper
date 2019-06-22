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

/**
 * @param {vscode.ExtensionContext} context
 */
async function activate(context) {
	let previousVersion = context.globalState.get("aquPreviousVersion");
	let currentVersion = vscode.extensions.getExtension('azmoza.aqueduct-helper').packageJSON.version;

	console.log(`current version: ${currentVersion}, previous version: ${previousVersion}`);

	//* Checks the current version of the extension for the package.json file and compares it with the previous version installed on the users machine.
	if(previousVersion !== currentVersion) {
		//* If the versions are different display a message telling the user there has been an update and check the chnage logs
		let value = await vscode.window.showInformationMessage(`Aqueduct Helper has been updated to v${currentVersion}. Check the release notes for more details.`, "Show Me", "No Thanks");
		if(value === "Show Me") {
			//* if the user wants to see the change notes navigate them to an external link (chnage log page).
			vscode.env.openExternal("https://marketplace.visualstudio.com/items/AzMoza.aqueduct-helper/changelog")
		}
		//* Update the previous version to the current version
		context.globalState.update("aquPreviousVersion", currentVersion);
	}

	//* Execute a command that checks the version of aqueduct.
	cmd.exec("aqueduct --version", async (err) => {
		if(err) {
			//* If there is an error Aqueduct must not be installed so ask the user if they want to install Aqueduct. 
			let error = await vscode.window.showInformationMessage("Aqueduct is not installed. Would you like to install it now?", "Yes Please", "No");
			if(error === "Yes Please") {
				//* Displays a message stating that Aqueduct is being installed.
				vscode.window.showInformationMessage("Installing Aqueduct...");
				//* Execute a command that activates Aqueduct. IMPORTANT: Dart must be installed for this to execute successfully.
				cmd.exec("pub global activate aqueduct", async (err) => {
					if(err) {
						//* Display an error message if the execution failed
						vscode.window.showErrorMessage("Aqueduct could not be installed");
					} else {
						//* When Aqueduct has installed present a information message telling them to check out the tutorial 
						let tutorial = await vscode.window.showInformationMessage("Aqueduct is installed.", "View Tutorial", "No Thanks");
						if(tutorial === "View Tutorial") {
							//* Opens the offical Aqueduct tutorial.
							vscode.env.openExternal("https://aqueduct.io/docs/tut/getting-started/");
						}
					}
				});
			}
		}
	});
	
	//* Below are all the commands that can be executed by the user.
	let disposableModelCommand = vscode.commands.registerCommand('extension.aquModel', () => model.command());
	let disposableControllerCommand = vscode.commands.registerCommand('extension.aquController', () => controller.controller());
	let disposableCreatorCommand = vscode.commands.registerCommand('extension.aquCreate', () => create.create());
	let disposableTestCommand = vscode.commands.registerCommand('extension.aquTest', () => test.test());
	let disposableDocsCommand = vscode.commands.registerCommand('extension.aquDocs', () => docs.commandOpenDocs());

	context.subscriptions.push(disposableModelCommand);
	context.subscriptions.push(disposableControllerCommand);
	context.subscriptions.push(disposableCreatorCommand);
	context.subscriptions.push(disposableTestCommand);
	context.subscriptions.push(disposableDocsCommand);
	context.subscriptions.push(new DocsStatusBarItem());
}
exports.activate = activate;

//* This method is called when the extension is deactivated
function deactivate() { }

module.exports = {
	activate,
	deactivate
}
