const vscode = require('vscode');
const path = require('path');
const uri = require('file-uri-to-path')
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

        let selectedPath = uri(locationUri.toString());
        console.log(selectedPath);


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

        switch (template) {
            case "default":
                exec.exec(`cd ${selectedPath} && aqueduct create -t default ${name}`, (err, stdout, stderr) => {
                    if(err) {
                        return vscode.window.showErrorMessage("Error while creating project")
                    }
        
                    console.log('stdout: ' + stdout);
                    console.log('stderr: ' + stderr);
        
                    vscode.window.showInformationMessage("Aqueduct files created successfully");
                    vscode.commands.executeCommand("vscode.openFolder", locationUri, true);
                });
                break;
            case "DB":
                exec.exec(`cd ${selectedPath} && aqueduct create -t db ${name}`, (err, stdout, stderr) => {
                    if(err) {
                        return vscode.window.showErrorMessage("Error while creating project")
                    }
        
                    console.log('stdout: ' + stdout);
                    console.log('stderr: ' + stderr);

                    let folderUrl = vscode.Uri.file(path.join(locationUri, name));
        
                    vscode.window.showInformationMessage("Aqueduct files created successfully");
                    vscode.commands.executeCommand("vscode.openFolder", folderUrl, true);
                });
                break;
            case "DB and Auth":
                exec.exec(`cd ${selectedPath} && aqueduct create -t db_and_auth ${name}`, (err, stdout, stderr) => {
                    if(err) {
                        return vscode.window.showErrorMessage("Error while creating project")
                    }
        
                    console.log('stdout: ' + stdout);
                    console.log('stderr: ' + stderr);
        
                    vscode.window.showInformationMessage("Aqueduct files created successfully");
                    vscode.commands.executeCommand("vscode.openFolder", locationUri, true);
                });
                break;
            default:
                vscode.window.showErrorMessage("Unable to create template files");
                break;
        }
    }
}