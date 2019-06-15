const vscode = require('vscode')
const open = require('open');

module.exports = {
    statusOpenDocs: async function() {
        //* Opens the Aqueduct documentation when the status bar item is pressed
        try {
            await open("https://aqueduct.io/docs/");
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
        ]);

        try {
            switch (TOPIC) {
                case "Application Configuration":
                    await open(`${BASE_URL}/application/`);
                    break;
                case "HTTP":
                        await open(`${BASE_URL}/http/`);
                        break;
                case "Databases and ORM":
                        await open(`${BASE_URL}/db/`);
                        break;
                case "Authorization and OAuth 2.0":
                        await open(`${BASE_URL}/auth/`);
                        break;
                case "Development and Testing":
                        await open(`${BASE_URL}/testing/`);
                        break;
                case "Deployment":
                        await open(`${BASE_URL}/deploy/`);
                        break;
                case "OpenAPI Documentation":
                        await open(`${BASE_URL}/openapi/`);
                        break;
                case "Command Line Tools":
                        await open(`${BASE_URL}/cli/`);
                        break; 
                default:
                    await open(`${BASE_URL}/`);
                    break;
            }
        } catch (error) {
            vscode.window.showErrorMessage("Oh No! The Aqueduct documentation count not be open.")
        }
    }
}