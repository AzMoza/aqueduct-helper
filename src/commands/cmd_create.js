const vscode = require('vscode');
const exec = require('child_process');
const p = require("path");

module.exports = {
    create: async function () {
        let name = await vscode.window.showInputBox({
            prompt: "Enter the name of your project"
        })

        if(name === "") return;

        let locationUri = await vscode.window.showOpenDialog({
            canSelectFolders: true,
            canSelectFiles: false,
            canSelectMany: false,
        });

        let path = locationUri[0].fsPath;

        let template = await vscode.window.showQuickPick(["Default","Database","Database with Authentication"],
        {
            canPickMany: false,
            ignoreFocusOut: true,
            placeHolder: "Choose a template for your Aqueduct API"
        });

        let type;
        switch (template) {
            case "Default":
                type = "default";
                break;
            case "Database":
                type = "db";
                break;
            case "Database with Authentication":
                type = "db_and_auth";
                break;
            default:
                type = "default";
                break;
        }

        if (process.platform === "win32") {
            let drive = `${path[0]}:`;
            if (drive !== "c:") {
                vscode.window.showInformationMessage("We'll take it from here! Creating Aqueduct files. This may take a few minutes.");
                exec.exec(`${drive} && cd ${path} && aqueduct create -t ${type} ${name}`, (err, stdout, stderr) => {
                    if (err) {
                        console.log(err);
                        return vscode.window.showErrorMessage("Error while creating project")
                    }

                    console.log('stdout: ' + stdout);
                    console.log('stderr: ' + stderr);

                    vscode.window.showInformationMessage("Finished! Aqueduct files created successfully");

                    let folderUrl = vscode.Uri.file(p.join(path, `${name}`));
                    vscode.commands.executeCommand("vscode.openFolder", folderUrl, false)
                });
            } else {
                vscode.window.showInformationMessage("We'll take it from here! Creating Aqueduct files. This may take take a few minutes.");
                exec.exec(`cd ${path} && aqueduct create -t ${type} ${name}`, (err, stdout, stderr) => {
                    if (err) {
                        console.log(err);
                        return vscode.window.showErrorMessage("Error while creating project")
                    }

                    console.log('stdout: ' + stdout);
                    console.log('stderr: ' + stderr);

                    vscode.window.showInformationMessage("Finished! Aqueduct files created successfully");

                    let folderUrl = vscode.Uri.file(p.join(path, `${name}`));
                    vscode.commands.executeCommand("vscode.openFolder", folderUrl, false)
                });
            }
        } else if (process.platform === "darwin" || process.platform === "linux") {
            vscode.window.showInformationMessage("We'll take it from here! Creating Aqueduct files. This may take take a few minutes.");
            exec.exec(`cd ${path} && aqueduct create -t ${type} ${name}`, (err, stdout, stderr) => {
                if (err) {
                    console.log(err);
                    return vscode.window.showErrorMessage("Error while creating project")
                }

                console.log('stdout: ' + stdout);
                console.log('stderr: ' + stderr);

                vscode.window.showInformationMessage("Finished! Aqueduct files created successfully");

                let folderUrl = vscode.Uri.file(p.join(path, `${name}`));
                vscode.commands.executeCommand("vscode.openFolder", folderUrl, false)
            });
        } else {
            let error = await vscode.window.showErrorMessage("Your current OS does not support this feature. Please file a GitHub issue.", "Open GitHub", "Close");
            if (error === "Open GitHub") {
                vscode.env.openExternal("https://github.com/AzMoza/aqueduct-helper/issues/new")
            }
        }
    }
}