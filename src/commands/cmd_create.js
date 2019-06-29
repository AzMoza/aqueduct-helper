const vscode = require('vscode');
const exec = require('child_process');
const p = require("path");

module.exports = {
    //* This function creates the aqueduct template files using the Aqueduct command tool 
    create: async function () {
        //* Asks the user for the name of there project
        let name = await vscode.window.showInputBox({
            prompt: "Enter the name of your project"
        })

        //* Terminate the command if the name is null
        if(!name) return;

        //* Asks the user to select the location they want to save their new project
        let locationUri = await vscode.window.showOpenDialog({
            canSelectFolders: true,
            canSelectFiles: false,
            canSelectMany: false,
        });

        if(!locationUri) return;

        //* Extracts the file system path from the Uri array
        let path = locationUri[0].fsPath;

        //* Asks the user to select want project type they want for there API
        let template = await vscode.window.showQuickPick(["Default","Database","Database with Authentication"],
        {
            ignoreFocusOut: true,
            placeHolder: "Choose a template for your Aqueduct API"
        });

        let type;
        //* Assings the type variable to the value of the project type selection. 
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
            case undefined:
                return vscode.window.showErrorMessage("Unable to create project as a template must be selected");
        }

        
        //* Checks the current OS.
        if (process.platform === "win32") {
            //* Checks what drive the selected folder is in
            let drive = `${path[0]}:`;
            //* If the folder is not in the C drive.
            if (drive !== "c:") {
                vscode.window.showInformationMessage("We'll take it from here! Creating Aqueduct files. This may take a few minutes.");
                //* CD into the selected drive, then to the selected path and then run the aqueduct create command.
                exec.exec(`${drive} && cd ${path} && aqueduct create -t ${type} ${name}`, (err, stdout, stderr) => {
                    if (err) {
                        console.log(err);
                        return vscode.window.showErrorMessage("Error while creating project")
                    }

                    console.log('stdout: ' + stdout);
                    console.log('stderr: ' + stderr);

                    vscode.window.showInformationMessage("Finished! Aqueduct files created successfully");

                    let folderUrl = vscode.Uri.file(p.join(path, `${name}`));
                    //* Opens the created project in VS Code
                    vscode.commands.executeCommand("vscode.openFolder", folderUrl, false)
                });
            } else {
                vscode.window.showInformationMessage("We'll take it from here! Creating Aqueduct files. This may take a few minutes.");
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
        //* Checks if the current OS is either Mac OS or Linux
        } else if (process.platform === "darwin" || process.platform === "linux") {
            vscode.window.showInformationMessage("We'll take it from here! Creating Aqueduct files. This may take a few minutes.");
            //* CD into the selected directory and run the aqueduct create command
            exec.exec(`cd ${path} && aqueduct create -t ${type} ${name}`, (err, stdout, stderr) => {
                if (err) {
                    console.log(err);
                    return vscode.window.showErrorMessage("Error while creating project")
                }

                console.log('stdout: ' + stdout);
                console.log('stderr: ' + stderr);

                vscode.window.showInformationMessage("Finished! Aqueduct files created successfully");

                let folderUrl = vscode.Uri.file(p.join(path, `${name}`));
                //* Open the project in VS Code 
                vscode.commands.executeCommand("vscode.openFolder", folderUrl, false)
            });
        } else {
            //* Tells the user their OS is not suppoerted and to file a GitHub issue. (Need to know who uses what to see if its viable to add it.)
            let error = await vscode.window.showErrorMessage("Your current OS does not support this feature. Please file a GitHub issue.", "Open GitHub", "Close");
            if (error === "Open GitHub") {
                //* Opnes GitHub
                vscode.env.openExternal("https://github.com/AzMoza/aqueduct-helper/issues/new")
            }
        }
    }
}