const vscode = require('vscode')

module.exports = {
    //* This function opens the home page for the Aqueduct docs when the status bar is clicked
    statusOpenDocs: async function() {
        try {
            vscode.env.openExternal("https://aqueduct.io/docs/");
        } catch (error) {
            //* if the docs cannot be opened show an error message
            vscode.window.showErrorMessage("Oh No! The Aqueduct documentation count not be open.")
        }   
    },
    //* This function controls what documentation page to open when the docs command is executed
    commandOpenDocs: async function() {
        const BASE_URL = "https://aqueduct.io/docs";
        //* Creates a quick pick of all the different topics that can be opened.
        const TOPIC = await vscode.window.showQuickPick([
            "Tutorial",
            "Application Configuration",
            "HTTP",
            "Databases and ORM",
            "Authorization and OAuth 2.0",
            "Development and Testing",
            "Deployment",
            "OpenAPI Documentation",
            "Command Line Tools"
        ], 
        {
            ignoreFocusOut: true,
            matchOnDescription: true,
            placeHolder: "Choose a topic to search"
        });

        try {
            //* Takes the selected input and opens the correct documentation page depending on that selection
            switch (TOPIC) {
                case "Tutorial":
                    vscode.env.openExternal(`${BASE_URL}/tut/getting-started/`);
                    break;
                case "Application Configuration":
                    vscode.env.openExternal(`${BASE_URL}/application/`);
                    break;
                case "HTTP":
                    vscode.env.openExternal(`${BASE_URL}/http/`);
                    break;
                case "Databases and ORM":
                    vscode.env.openExternal(`${BASE_URL}/db/`);
                    break;
                case "Authorization and OAuth 2.0":
                    vscode.env.openExternal(`${BASE_URL}/auth/`);
                    break;
                case "Development and Testing":
                    vscode.env.openExternal(`${BASE_URL}/testing/`);
                    break;
                case "Deployment":
                    vscode.env.openExternal(`${BASE_URL}/deploy/`);
                    break;
                case "OpenAPI Documentation":
                    vscode.env.openExternal(`${BASE_URL}/openapi/`);
                    break;
                case "Command Line Tools":
                    vscode.env.openExternal(`${BASE_URL}/cli/`);
                    break; 
                default:
                    vscode.window.showErrorMessage("Unable to open documentation");
                    break;
            }
        } catch (error) {
            vscode.window.showErrorMessage("Oh No! The Aqueduct documentation count not be open.")
        }
    }
}