# Change Log
All notable changes to the Aqueduct Helper will be documented in this file. If you wish to request a feature please do so [here](https://github.com/AzMoza/aqueduct-snippets/issues/new).

## [0.3.0] - 2019-06-13
#### Added
- Test Command 
    - `aquTest`: Creates a basic test file with a simple test that expects a 200 OK response when calling a specific API endpoint.
#### Changed
- The primary key snippet now creates `@primaryKey` instead of `@Column(primaryKey: true)`
#### Fixed
- Overwriting a file would only allow one attempt
- Formatting when generating the model and resource controller files

## [0.2.1] - 2019-06-13
#### Added
- Two test snippets
    - `aqu-http-test`: Creates a simple test that expects 200 OK.
    - `aqu-json-test`: Creates a simple test that expects the response to be a list of JSON objects which includes a ID which is a number.
#### Changed
- The primary key snippet now creates `@primaryKey` instead of `@Column(primaryKey: true)`
#### Fixed
- Overwriting a file would only allow one attempt
- Formatting when generating the model and resource controller files

## [0.1.1] - 2019-06-12
#### Fixed
- Mac OS files being created in the wrong directory

## [0.1.0] - 2019-06-12
#### Added
- Initial release