const vscode = require('vscode');
const path = require('path');

const writer = require('../files.js');

module.exports = {
    controller: async function() {
        if (!vscode.workspace.workspaceFolders) {
			return vscode.window.showErrorMessage("Please open a directory before running this command");
		}

		const CONTROLLER_FILE_NAME = await vscode.window.showInputBox({
            prompt: "Controller File Name (excluding .dart)",
            placeHolder: "user_controller"
        });
        
        if(!CONTROLLER_FILE_NAME) return;

		const CONTROLLER_NAME = await vscode.window.showInputBox({
            prompt: "Name of your controller",
            placeHolder: "UserController"
		});

		if (!CONTROLLER_NAME) return;

		let boilerplate = await vscode.window.showInputBox({
			prompt: "Would you like use to create basic HTTP get, post, put and delete requests? y/n"
        });
        
        if (!boilerplate) return;

		let fileContent;

		if (boilerplate.toLowerCase() === 'y') {
			fileContent = `
// TODO: Update this import with your application name to import all required aqueduct imports.
import '../application_name.dart';

class ${CONTROLLER_NAME} extends ResourceController {
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

class ${CONTROLLER_NAME} extends ResourceController {

}`
        }
        
		const CONTROLLER_FILE = "/lib/controllers";

        const FULL_PATH = path.join(vscode.workspace.rootPath, CONTROLLER_FILE);
        const FILE_NAME = CONTROLLER_FILE_NAME.toLowerCase() + ".dart";
        
        await writer.writer(FULL_PATH, FILE_NAME, fileContent);

    }
}