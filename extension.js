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

	let modelCommand = vscode.commands.registerCommand('extension.aquModel', async function () {
		if(!vscode.workspace.workspaceFolders) {
			return vscode.window.showErrorMessage("Please open a directory before running this command");
		}

		const modelName = await vscode.window.showInputBox({
			prompt: "Model Name"
		});

		if(!modelName) return;

		let property = await vscode.window.showInputBox({
			prompt: "Property Type and Property Name e.g. String name (Press 'return' when finished)"
		});

		const properties = [];

		while(property !== '') {
			properties.push(property);
			property = await vscode.window.showInputBox({
				prompt: "Property Name (Press 'return' when finished)"
			});
		}

		const decleration = properties.map(prop => `@Column(nullable: false) ${prop};\n\t`);
		const fileContent = `
// TODO: Update this import with your application name to import all required aqueduct imports.
import '../application_name.dart';

class ${modelName} extends ManagedObject<_${modelName}> implements _${modelName} {}

class _${modelName} {
	${decleration.join("")}
}
		`
		
		const rootFolderPath = vscode.workspace.rootPath;
		const modelFile = "\\lib\\models";

		const fileName = modelName.toLowerCase() + ".dart";

		const fullPath = path.join(rootFolderPath, modelFile);

		fs.stat(fullPath, function (error) {
			if (error) {
				if (error.code === "ENOENT") {
					fs.mkdir(fullPath, (err) => {
						if(err) {
							return vscode.window.showErrorMessage("Thats weird! We cannot create the necessary folders.")
						} else {
							fs.writeFile(path.join(fullPath, fileName), fileContent, err => {
								if (err) {
									return vscode.window.showErrorMessage(`Oh No! We couldnt create ${fileName}`);
								}
								vscode.window.showInformationMessage(`Sorted! Created ${fileName}`);
							});
							
						}
					})
				} else {
					return vscode.window.showErrorMessage("Thats weird! We cannot create the necessary folders.")
				}
			} else {
				fs.writeFile(path.join(fullPath, fileName), fileContent, err => {
					if (err) {
						return vscode.window.showErrorMessage(`Oh No! We couldnt create ${fileName}`);
					}
					vscode.window.showInformationMessage(`Sorted! Created ${fileName}`);
				});
			}
		});
	});

	let controllerCommand = vscode.commands.registerCommand('extension.aquCon', async function () {
		if(!vscode.workspace.workspaceFolders) {
			return vscode.window.showErrorMessage("Please open a directory before running this command");
		}

		const controllerFileName = await vscode.window.showInputBox({
			prompt: "Controller File Name (excluding .dart)"
		});

		const controllerName = await vscode.window.showInputBox({
			prompt: "Controller Name"
		});

		if(!controllerName) return;

		let boilerplate = await vscode.window.showInputBox({
			prompt: "Would you like use to create basic HTTP get, post, put and delete requests? y/n"
		});

		let fileContent;

		if(boilerplate.toLowerCase() === 'y') {
			fileContent = `
		// TODO: Update this import with your application name to import all required aqueduct imports.
		import '../application_name.dart';

		class ${controllerName} extends ResourceController {
			@Operation.get()
			Future<Response> get() async {
				//TODO: Implement get method
			}

			@Operation.post()
			Future<Response> post() async {
				//TODO: Implement post method
			}

			@Operation.put()
			Future<Response> put() async {
				//TODO: Implement put method
			}

			@Operation.delete()
			Future<Response> delete() async {
				//TODO: Implement delete method
			}
		}`
		} else {
			fileContent = `
		// TODO: Update this import with your application name to import all required aqueduct imports.
		import '../application_name.dart';

		class ${controllerName} extends ResourceController {

		}`
		}
	
		const rootFolderPath = vscode.workspace.rootPath;
		const controllerFile = "\\lib\\controllers";

		const fileName = controllerFileName.toLowerCase() + ".dart";

		const fullPath = path.join(rootFolderPath, controllerFile);

		fs.stat(fullPath, function (error) {
			if (error) {
				if (error.code === "ENOENT") {
					fs.mkdir(fullPath, (err) => {
						if(err) {
							return vscode.window.showErrorMessage("Thats weird! We cannot create the necessary folders.")
						} else {
							fs.writeFile(path.join(fullPath, fileName), fileContent, err => {
								if (err) {
									return vscode.window.showErrorMessage(`Oh No! We couldnt create ${fileName}`);
								}
								vscode.window.showInformationMessage(`Hell Yeah! Created ${fileName}`);
							});
							
						}
					})
				} else {
					return vscode.window.showErrorMessage("Thats weird! We cannot create the necessary folders.")
				}
			} else {
				fs.writeFile(path.join(fullPath, fileName), fileContent, err => {
					if (err) {
						return vscode.window.showErrorMessage(`Oh No! We couldnt create ${fileName}`);
					}
					vscode.window.showInformationMessage(`Whoop! Created ${fileName}`);
				});
			}
		});
	});

	context.subscriptions.push(modelCommand, controllerCommand);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
