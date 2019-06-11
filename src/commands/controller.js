const vscode = require('vscode');
const fs = require('fs');
const path = require('path');

module.exports = {
    controller: async function() {
        if (!vscode.workspace.workspaceFolders) {
			return vscode.window.showErrorMessage("Please open a directory before running this command");
		}

		const controllerFileName = await vscode.window.showInputBox({
			prompt: "Controller File Name (excluding .dart)"
		});

		const controllerName = await vscode.window.showInputBox({
			prompt: "Controller Name"
		});

		if (!controllerName) return;

		let boilerplate = await vscode.window.showInputBox({
			prompt: "Would you like use to create basic HTTP get, post, put and delete requests? y/n"
		});

		let fileContent;

		if (boilerplate.toLowerCase() === 'y') {
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
						if (err) {
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
    }
}