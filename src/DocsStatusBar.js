const vscode = require('vscode');

class DocsStatusBarItem {
	constructor() {
        this._statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
        this._statusBarItem.tooltip = 'Click to view Aqueduct documentation.';
        this._statusBarItem.show();

        this.refreshUI();
	}

	dispose() {
		this._statusBarItem.dispose();
	}

	refreshUI() {
        console.log("Updated Status UI");
		this._statusBarItem.text = "Aqueduct Docs";
	}
}

module.exports = DocsStatusBarItem;