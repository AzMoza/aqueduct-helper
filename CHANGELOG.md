# Change Log
All notable changes to the Aqueduct Helper will be documented in this file. If you wish to request a feature please do so [here](https://github.com/AzMoza/aqueduct-helper/issues/new).

## [0.4.0] - 2019-06-19
#### Added
- `aqu-relate`: Create a relationship annotation.
#### Changed
- When generating a model via the `aquModel` command `willUpdate()` and `willInsert()` have been added.
- Status Bar:
    - Moved to the left.
    - Added an icon.
#### Fixed
- Aqueduct extension showing when not programming in Dart.
- Pressing escape when creating a model creates a bunch of undifinded variables.

## [0.3.3] - 2019-06-19
#### Fixed
- Aqueduct version being shown repeatedly on VS Code launch.

## [0.3.1] - 2019-06-19
#### Added
- Create Aqueduct Projects Command
    - `aquCreate`: Creates either a default, DB or DB with auth project straight from VS Code.
- Can now access the tutorial from the documentation quick pick.
#### Change
- Aqueduct will be installed when the plugin is activated if it is not already installed (with permission of the user).
#### Fixed
- When requested the change notes would not be shown.

## [0.3.0] - 2019-06-15
#### Added
- Test Command
    - `aquTest`: Creates a basic test file with a simple test that expects a 200 OK response when calling a specific API endpoint.
- Aqueduct Documentation Command.
    - `aquDocs`: Allows you to search the docs within VS Code (Pages will open in your default web browser).
- Aqueduct Documentation Status Bar
    - Press the "Aqueduct Docs" button located on the status bar (bottom right) to be taken immediately to the Aqueduct documentation.
#### Changed
- Changed `aquCon` to `aquController`.
- Commands are now grouped together. You can see all available commands by typing 'Aqueduct' in the command palette.
#### Fixed
- General bug fixes.

## [0.2.1] - 2019-06-13
#### Added
- Two test snippets
    - `aqu-http-test`: Creates a simple test that expects 200 OK.
    - `aqu-json-test`: Creates a simple test that expects the response to be a list of JSON objects which includes a ID which is a number.
#### Changed
- The primary key snippet now creates `@primaryKey` instead of `@Column(primaryKey: true)`
#### Fixed
- Overwriting a file would only allow one attempt.
- Formatting when generating the model and resource controller files.

## [0.1.1] - 2019-06-12
#### Fixed
- Mac OS files being created in the wrong directory.

## [0.1.0] - 2019-06-12
#### Added
- Initial release.