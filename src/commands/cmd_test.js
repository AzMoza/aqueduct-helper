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

        const FILE_CONTENT = `
import 'harness/app.dart';

Future main() async {
  final harness = Harness()..install();

  test("GET /endpoint returns a 200 OK", () async {
      final response = await harness.agent.get("/endpoint");
      expectResponse(response, 200);
  });
}
        `
        const TEST_FILE_PATH = "/test";

        const FULL_PATH = path.join(vscode.workspace.rootPath, TEST_FILE_PATH);
        const FILE_NAME = testFileName.toLowerCase() + ".dart";
        
        await writer.writer(FULL_PATH, FILE_NAME, FILE_CONTENT);
    }
}