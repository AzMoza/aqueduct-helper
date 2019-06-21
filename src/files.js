const vscode = require('vscode');
const fs = require('fs');
const path = require('path');

module.exports = {
    //* This function takes in the desired file path, file name and the content of the files and writes the file to the users drive.
    writer: async function(fullPath, fileName, fileContent) {
        //* Checks the status of the folder at the desired folder path to see if it exists.
        fs.stat(fullPath, function (error) {
            if (error) {
                //* ENOENT === Error No Entry - The folder cannot be accsessed as it does not exists
                if (error.code === "ENOENT") {
                    //* Creates the directory that was selected
                    fs.mkdir(fullPath, (err) => {
                        if (err) {
                            return vscode.window.showErrorMessage("Thats weird! We cannot create the necessary folders.")
                        } else {
                            //* Once the directory has been created create the file which contains the contents that was passed through from the command file.
                            fs.writeFile(path.join(fullPath, fileName), fileContent, err => {
                                if (err) {
                                    //* Present the user with an error message if something goes wrong.
                                    return vscode.window.showErrorMessage(`Oh No! We couldnt create ${fileName}`);
                                }
                                vscode.window.showInformationMessage(`Sorted! Created ${fileName}`);
                            });
                        }
                    })
                } else {
                    //* Shows an error message if the error code is not ENOENT.
                    return vscode.window.showErrorMessage("Thats weird! We cannot create the necessary folders.")
                }
            } else {
                //* Tests the users permission for a file to see if it already exists.
                fs.access(path.join(fullPath, fileName), fs.constants.F_OK, async function (err) {
                    if (err) {
                        //* If the file does not exists it will throw an error. So the file can just be created as normal. 
                        fs.writeFile(path.join(fullPath, fileName), fileContent, err => {
                            if (err) {
                                //* Shows an error message if something goes wrong.
                                return vscode.window.showErrorMessage(`Oh No! We couldnt create ${fileName}`);
                            }
                            return vscode.window.showInformationMessage(`Sorted! Created ${fileName}`);
                        }); 
                    } else {
                        //* If the file exists display a message that alerts the user that there is a conflict of file names.
                        const OVERRIDE = await vscode.window.showInputBox({
                            prompt: "A file already exists with the choosen name. Would you like to override it? y/n"
                        });
                        
                        //* Decides what to do from the users input
                        if(OVERRIDE.toLowerCase() === "y") {
                            //* If the user decides to overwrite the file then just write the file as normal.
                            fs.writeFile(path.join(fullPath, fileName), fileContent, err => {
                                if (err) {
                                    return vscode.window.showErrorMessage(`Oh No! We couldnt create ${fileName}`);
                                }
                                vscode.window.showInformationMessage(`Sorted! Created ${fileName}`);
                            }); 
                        } else {
                            //* Defines wheather the overwrite is incomplete
                            let overwriteIncomplete = true;
                            //* Loops until overwriteIncomplete is false
                            while(overwriteIncomplete) {
                                //* Asks the user for a new file name
                                let newFileName = await vscode.window.showInputBox({
                                    prompt: `New File Name (excluding .dart) Previous Name: ${fileName}`
                                });

                                //* Assigns the uder inputted value to a new variable
                                let overwriteFileName = newFileName.toLowerCase() + '.dart'

                                //* IMPORTANT: All code below is Synchronous (DO NOT CHANGE TO ASYNC)
                                //* Checks if the file doesnt exists
                                if(!fs.existsSync(path.join(fullPath, overwriteFileName))) {
                                    //* Writes the file with the new name
                                    fs.writeFileSync(path.join(fullPath, overwriteFileName), fileContent);
                                    //* Checks if the file was written successfully
                                    if(fs.existsSync(path.join(fullPath, overwriteFileName))) {
                                        //* Sets overwriteIncomplete to false which completes the while loop.
                                        overwriteIncomplete = false;
                                        //* Breaks out the while loop by returning a information window alerting the user the file was created.
                                        return vscode.window.showInformationMessage(`Sorted! Created ${overwriteFileName}`);  
                                    } else {
                                        //* Alerts the user of an issue
                                        return vscode.window.showErrorMessage(`Whoops! Could not Create ${overwriteFileName}`);  
                                    }    
                                }

                                //* This while loop will keep executing until a valid name has been selected
                            }
                        }
                    }
                })
            }
        });
    }
}