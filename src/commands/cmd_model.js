const vscode = require('vscode');
const path = require('path');

const writer = require('../files.js');

module.exports = {
    command: async function () {
        if (!vscode.workspace.workspaceFolders) {
            return vscode.window.showErrorMessage("Please open a directory before running this command");
        }

        let modelFileName = await vscode.window.showInputBox({
            prompt: "Enter the name of your model file (excluding .dart)",
            placeHolder: "user"
        });
        
        let modelName = await vscode.window.showInputBox({
            prompt: "Enter the name of your model",
            placeHolder: "User"
        });

        if (!modelName) return;

        let property = await vscode.window.showInputBox({
            prompt: "Property Type and Property Name - exclude ';' (Press 'return' when finished)",
            placeHolder: "String name"
        });

        const PROPERTIES = [];

        while (property !== '' && property !== undefined) {
            PROPERTIES.push(property);
            property = await vscode.window.showInputBox({
                prompt: "Property Type and Property Name - exclude ';' (Press 'return' when finished)",
                placeHolder: "String name"
            });
        }

        let decleration = PROPERTIES.map(prop => `\t@Column(nullable: false) ${prop};\n`);

        const fileContent = `
// TODO: Update this import with your application name to import all required aqueduct imports.
import '../application_name.dart';
    
class ${modelName} extends ManagedObject<_${modelName}> implements _${modelName} {
  @override
  void willUpdate() {
    // TODO: Add anything here to change prior to being updated.
  }

  @override
  void willInsert() {
    // TODO: Add anything here to change prior to being inserted.
  }
}
    
class _${modelName} {
${decleration.join("")}
}
        `
        const MODEL_FILE = "/lib/models";

        const FULL_PATH = path.join(vscode.workspace.rootPath, MODEL_FILE);
        const FILE_NAME = modelFileName.toLowerCase() + ".dart";
        
        await writer.writer(FULL_PATH, FILE_NAME, fileContent);
    },
}