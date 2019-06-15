const vscode = require('vscode');
const fs = require('fs');
const path = require('path');

module.exports = {
    writer: async function(fullPath, fileName, fileContent) {
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
                        const OVERRIDE = await vscode.window.showInputBox({
                            prompt: "A file already exists with the choosen name. Would you like to override it? y/n"
                        });
    
                        if(OVERRIDE.toLowerCase() === "y") {
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
                                let newFileName = await vscode.window.showInputBox({
                                    prompt: `New File Name (excluding .dart) Previous Name: ${fileName}`
                                });

                                let overwriteFileName = newFileName.toLowerCase() + '.dart'

                                if(!fs.existsSync(path.join(fullPath, overwriteFileName))) {
                                    fs.writeFileSync(path.join(fullPath, overwriteFileName), fileContent);
                                    // Checks if the file was written
                                    if(fs.existsSync(path.join(fullPath, overwriteFileName))) {
                                        overwriteIncomplete = false;
                                        return vscode.window.showInformationMessage(`Sorted! Created ${overwriteFileName}`);  
                                    } else {
                                        return vscode.window.showErrorMessage(`Whoops! Could not Create ${overwriteFileName}`);  
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