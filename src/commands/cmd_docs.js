const vscode = require('vscode')

module.exports = {
    statusOpenDocs: async function() {
        //* Opens the Aqueduct documentation when the status bar item is pressed
        try {
            await vscode.env.openExternal("https://aqueduct.io/docs/");
        } catch (error) {
            vscode.window.showErrorMessage("Oh No! The Aqueduct documentation count not be open.")
        }   
    },
    commandOpenDocs: async function() {
        const BASE_URL = "https://aqueduct.io/docs";
        const TOPIC = await vscode.window.showQuickPick([
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
            switch (TOPIC) {
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