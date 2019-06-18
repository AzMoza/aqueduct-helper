const vscode = require('vscode');
const path = require('path');
const uri = require('file-uri-to-path');
const exec = require('child_process');

module.exports = {
    create: async function() {
        let name = await vscode.window.showInputBox({
            prompt: "Enter the name of your project"
        })

        let locationUri = await vscode.window.showOpenDialog({
            canSelectFolders: true,
            canSelectFiles: false,
            canSelectMany: false,
        });

        let path = locationUri[0].fsPath;

        let template = await vscode.window.showQuickPick([
            "Default",
            "DB",
            "DB and Auth"
        ],
        {
            canPickMany: false,
            ignoreFocusOut: true,
            placeHolder: "Choose a template for your Aqueduct API"
        });

        if(process.platform === "win32") {
            let type;

            switch(template) {
                case "Default":
                    type = "default";
                    break; 
                case "DB":
                    type = "db";
                    break; 
                case "DB and Auth":
                    type = "db_and_auth";
                    break; 
                default: 
                    type = "default";
                    break;
            }

            let drive = `${path[0]}:`;
            if(drive !== "c:") {
                vscode.window.showInformationMessage("We'll take it from here! Creating Aqueduct files");
                exec.exec(`${drive} && cd ${path} && aqueduct create -t ${type} ${name}`, (err, stdout, stderr) => {
                    if(err) {
                        console.log(err);
                        return vscode.window.showErrorMessage("Error while creating project")
                    }
        
                    console.log('stdout: ' + stdout);
                    console.log('stderr: ' + stderr);
        
                    vscode.window.showInformationMessage("Finished! Aqueduct files created successfully");
                });
            } else {
                vscode.window.showInformationMessage("We'll take it from here! Creating Aqueduct files");
                exec.exec(`cd ${path} && aqueduct create -t ${type} ${name}`, (err, stdout, stderr) => {
                    if(err) {
                        console.log(err);
                        return vscode.window.showErrorMessage("Error while creating project")
                    }
        
                    console.log('stdout: ' + stdout);
                    console.log('stderr: ' + stderr);
        
                    vscode.window.showInformationMessage("Finished! Aqueduct files created successfully");
                });
            }
        } else if(process.platform === "darwin") {
            
        } else {
            let error = await vscode.window.showErrorMessage("Your current OS does not support this feature. Please file a GitHib issue.", "Open Github", "Close");
            if(error === "Open Github") {
                vscode.env.openExternal("https://github.com/AzMoza/aqueduct-helper/issues/new")
            }
        }
    }
}