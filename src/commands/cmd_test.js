const vscode = require('vscode');
const path = require('path');

const writer = require('../files.js');

module.exports = {
    test: async function() {
        if (!vscode.workspace.workspaceFolders) {
            return vscode.window.showErrorMessage("Please open a directory before running this command");
        }

        let testFileName = await vscode.window.showInputBox({
			prompt: "Enter the name of your test file (excluding .dart)"
        });

        const fileContent = `
import 'harness/app.dart';

Future main() async {
  final harness = Harness()..install();

  test("GET /endpoint returns a 200 OK", () async {
      final response = await harness.agent.get("/endpoint");
      expectResponse(response, 200);
  });
}
        `
        const testFilePath = "/test";

        const fullPath = path.join(vscode.workspace.rootPath, testFilePath);
        const fileName = testFileName.toLowerCase() + ".dart";
        
        await writer.writer(fullPath, fileName, fileContent);
    }
}