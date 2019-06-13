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
		const controllerFile = "/lib/controllers";

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
                                let newControllerName = await vscode.window.showInputBox({
                                    prompt: "New Controller File Name (excluding .dart)"
                                });
        
                                let overwritefileName = newControllerName.toLowerCase() + '.dart';

                                if(!fs.existsSync(path.join(fullPath, overwritefileName))) {
                                    fs.writeFileSync(path.join(fullPath, overwritefileName), fileContent);
                                    // Checks if the file was written
                                    if(fs.existsSync(path.join(fullPath, overwritefileName))) {
                                        overwriteIncomplete = false;
                                        return vscode.window.showInformationMessage(`Sorted! Created ${overwritefileName}`);  
                                    } else {
                                        return vscode.window.showErrorMessage(`Whoops! We couldnt create ${overwritefileName}`);  
                                    }    
                                }
                            }
                        }
                    }
                });
			}
        });
    }
}