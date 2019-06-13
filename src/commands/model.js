const vscode = require('vscode');
const fs = require('fs');
const path = require('path');

module.exports = {
    command: async function () {
        if (!vscode.workspace.workspaceFolders) {
            return vscode.window.showErrorMessage("Please open a directory before running this command");
        }

        const modelFileName = await vscode.window.showInputBox({
			prompt: "Enter the name of your model file (excluding .dart)"
		});

        let modelName = await vscode.window.showInputBox({
            prompt: "Enter the name of your model"
        });

        if (!modelName) return;

        let property = await vscode.window.showInputBox({
            prompt: "Property Type and Property Name e.g. String name - exclude ';' (Press 'return' when finished)"
        });

        const properties = [];

        while (property !== '') {
            properties.push(property);
            property = await vscode.window.showInputBox({
                prompt: "Property Type and Property Name e.g. String name - exclude ';' (Press 'return' when finished)"
            });
        }

        const decleration = properties.map(prop => `\t@Column(nullable: false) ${prop};\n`);
        const fileContent = `
// TODO: Update this import with your application name to import all required aqueduct imports.
import '../application_name.dart';
    
class ${modelName} extends ManagedObject<_${modelName}> implements _${modelName} {}
    
class _${modelName} {
${decleration.join("")}
}
        `
        const rootFolderPath = vscode.workspace.rootPath;
        const modelFile = "/lib/models";

        const fileName = modelFileName.toLowerCase() + ".dart";

        const fullPath = path.join(rootFolderPath, modelFile);

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
                                console.log(path.join(fullPath, fileName))
                                vscode.window.showInformationMessage(`Sorted! Created ${fileName}`);
                            });
                        }
                    })
                } else {
                    return vscode.window.showErrorMessage("Thats weird! We cannot create the necessary folders.")
                }
            } else {
                fs.access(path.join(fullPath, fileName), fs.constants.F_OK, async function (err) {
                    if (err) {
                        fs.writeFile(path.join(fullPath, fileName), fileContent, err => {
                            if (err) {
                                return vscode.window.showErrorMessage(`Oh No! We couldnt create ${fileName}`);
                            }
                            return vscode.window.showInformationMessage(`Sorted! Created ${fileName}`);
                        }); 
                    } else {
                        const override = await vscode.window.showInputBox({
                            prompt: "A file already exists with the choosen name. Would you like to override it? y/n"
                        });
    
                        if(override.toLowerCase() === "y") {
                            console.log("Overwritting file");
                            fs.writeFile(path.join(fullPath, fileName), fileContent, err => {
                                if (err) {
                                    return vscode.window.showErrorMessage(`Oh No! We couldnt create ${fileName}`);
                                }
                                vscode.window.showInformationMessage(`Sorted! Created ${fileName}`);
                            }); 
                        } else {
                            let overwriteIncomplete = true;
                            while(overwriteIncomplete) {
                                let newModelName = await vscode.window.showInputBox({
                                    prompt: "New Model File Name (excluding .dart)"
                                });

                                let overwritefileName = newModelName.toLowerCase() + '.dart'

                                if(!fs.existsSync(path.join(fullPath, overwritefileName))) {
                                    fs.writeFileSync(path.join(fullPath, overwritefileName), fileContent);
                                    // Checks if the file was written
                                    if(fs.existsSync(path.join(fullPath, overwritefileName))) {
                                        overwriteIncomplete = false;
                                        return vscode.window.showInformationMessage(`Sorted! Created ${overwritefileName}`);  
                                    } else {
                                        return vscode.window.showErrorMessage(`Whoops! Could not Create ${overwritefileName}`);  
                                    }    
                                }
                            }
                        }
                    }
                })
            }
        });
    }
}