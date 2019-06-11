// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const fs = require('fs');
const path = require('path');

const model = require('./commands/model.js')
const controller = require('./commands/controller.js')

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

	context.subscriptions.push(disposableModelCommand);
	context.subscriptions.push(disposableControllerCommand);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() { }

module.exports = {
	activate,
	deactivate
}
