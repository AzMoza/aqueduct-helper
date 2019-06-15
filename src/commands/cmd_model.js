const vscode = require('vscode');
const path = require('path');

const writer = require('../files.js');

module.exports = {
    command: async function () {
        if (!vscode.workspace.workspaceFolders) {
            return vscode.window.showErrorMessage("Please open a directory before running this command");
        }

        let modelFileName = await vscode.window.showInputBox({
			prompt: "Enter the name of your model file (excluding .dart)"
        });
        
        let modelName = await vscode.window.showInputBox({
            prompt: "Enter the name of your model"
        });

        if (!modelName) return;

        let property = await vscode.window.showInputBox({
            prompt: "Property Type and Property Name e.g. String name - exclude ';' (Press 'return' when finished)"
        });

        const PROPERTIES = [];

        while (property !== '') {
            PROPERTIES.push(property);
            property = await vscode.window.showInputBox({
                prompt: "Property Type and Property Name e.g. String name - exclude ';' (Press 'return' when finished)"
            });
        }

        const decleration = PROPERTIES.map(prop => `\t@Column(nullable: false) ${prop};\n`);
        const fileContent = `
// TODO: Update this import with your application name to import all required aqueduct imports.
import '../application_name.dart';
    
class ${modelName} extends ManagedObject<_${modelName}> implements _${modelName} {}
    
class _${modelName} {
${decleration.join("")}
}
        `
        const MODEL_FILE = "/lib/models";

        const FULL_PATH = path.join(vscode.workspace.rootPath, MODEL_FILE);
        const FILE_NAME = modelFileName.toLowerCase() + ".dart";
        
        await writer.writer(FULL_PATH, FILE_NAME, fileContent);
    }
}