const vscode = require('vscode');

class DocsStatusBarItem {
	constructor() {
		this._statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 20);
		this._statusBarItem.text = "$(link-external) Aqueduct Docs";
		this._statusBarItem.tooltip = "Opens the Aquedct Documentation";
		this._statusBarItem.command = "extension.aquStatusDocs";
        this._statusBarItem.show();
	}

	dispose() {
		this._statusBarItem.dispose();
	}
}

module.exports = DocsStatusBarItem;