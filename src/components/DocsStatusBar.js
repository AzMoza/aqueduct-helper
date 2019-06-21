const vscode = require('vscode');

//* Creates a status bar item that will be visible on the bottom left
class DocsStatusBarItem {
	constructor() {
		this._statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left);

		//* Sets the different parameters
		this._statusBarItem.text = "$(browser)  Aqueduct Docs";
		this._statusBarItem.tooltip = "Opens the Aquedct Documentation";
		//* Assigns the command that will be executed when the status bar is clicked
		this._statusBarItem.command = "extension.aquStatusDocs";
		//* Shows the status bar
        this._statusBarItem.show();
	}

	dispose() {
		this._statusBarItem.dispose();
	}
}

module.exports = DocsStatusBarItem;