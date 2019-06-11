# Aqueduct Snippets README
This is the README for Aqueduct Snippets. This extension aims to help speed up API development when using the aqueduct framework.

### Useful Links
Find below a list of useful links to help you get started.
- [Aqueduct Documentation](https://aqueduct.io/docs/)
- [Aqueduct Tutorial](https://aqueduct.io/docs/tut/getting-started/)
- [Dart Documentation](https://dart.dev/guides)

## Features
Describe specific features of your extension including screenshots of your extension in action. Image paths are relative to this README file.

![Aqueduct Model Creator command](/images/model_command.gif)

#### Snippets
Find below all the possible snippets you can use while creating your APIs.

##### Configuration
- `aqu-config`: Creates a subclass for reading configuration file.
- `aqu-yaml-config`: Creates a basic YAML configuration file.

##### HTTP
- `aqu-link-func`: Creates a basic link function.
- `aqu-link`: Creates a basic link route.
- `aqu-file`: Returns the content of a file.
- `aqu-socket`: Creates a basic websocket server.

##### ORM
- `aqu-model`: Creates a basic model that replicates a database table.
- `aqu-controller`: Creates a basic resource controller.
- `aqu-column`: Creates a column annotation.
- `aqu-table`: Changes the name of the table definition.
- `aqu-transaction`: Creates the basic transaction.

##### Auth
- `aqu-auth-token`: Creates a auth token route that grants and refreshes tokens.
- `aqu-auth-bearer`: Creates a protected route with an OAuth 2.0 bearer token.
- `aqu-auth-basic`: Creates a protected route with basic HTTP Authentication.

#### Commands
Find below all the possible commands you can use while creating your APIs. To use press <kbd>CTRL</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> on Windows or <kbd>⌘ Command</kbd>+<kbd>⇧ Shift</kbd>+<kbd>P</kbd> on Mac

- `aquModel`: Creates a customisable model file.
- `aquCon`: Creates a customisable controller file.
    - You will have the option to include a get, post, put and delete request.

## Release Notes
All notable changes to Aqueduct Snippets will be documented here.

#### [1.0.0] - 2019-06-11
##### Added
- Initial release
