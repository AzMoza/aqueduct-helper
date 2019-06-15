const vscode = require('vscode');
const path = require('path');

const writer = require('../files.js');

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
        
		const controllerFile = "/lib/controllers";

        const fullPath = path.join(vscode.workspace.rootPath, controllerFile);
        const fileName = controllerFileName.toLowerCase() + ".dart";
        
        await writer.writer(fullPath, fileName, fileContent);

    }
}