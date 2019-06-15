// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

const model = require('./commands/cmd_model.js')
const controller = require('./commands/cmd_controller.js')
const test = require('./commands/cmd_test.js')
const docs = require('./commands/cmd_docs.js')
const DocsStatusBarItem = require('./DocsStatusBar.js');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	let disposableModelCommand = vscode.commands.registerCommand('extension.aquModel', async function () {
		model.command()
	});

	let disposableControllerCommand = vscode.commands.registerCommand('extension.aquCon', async function () {
		controller.controller()
	});

	let disposableTestCommand = vscode.commands.registerCommand('extension.aquTest', async function () {
		test.test();
	});

	let disposableStatusDocsCommand = vscode.commands.registerCommand('extension.aquStatusDocs', async function () {
		docs.statusOpenDocs();
	});

	let disposableDocsCommand = vscode.commands.registerCommand('extension.aquDocs', async function () {
		docs.commandOpenDocs();
	});

	context.subscriptions.push(disposableModelCommand);
	context.subscriptions.push(disposableControllerCommand);
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
