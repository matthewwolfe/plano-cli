# Plano CLI

A CLI and programmatic API for generating files, directories, and snippets from
templates with context values and helper functions.

## Getting Started

### Installation

It is recommended to install globally if using the CLI.

```
npm install plano-cli
```

## Quick Start

Create a directory named `plano`. See the [examples](https://github.com/matthewwolfe/plano-cli/tree/main/examples) for more info. By default Plano will look for templates in the home directory, typically `~`.
Additional paths can be specified.

### Generate

```
Usage: plano [options] [command]

CLI to scaffold files and directories from templates

Options:
  -v, --version              output the version number
  -h, --help                 display help for command

Commands:
  generate [options] [name]  Generate files or directories from a template
  snippet [options] [name]   Generate a snippet from a template
  help [command]             display help for command
```

#### File/Directory Example

```
plano generate react-component
```

#### Snippet Example

```
plano snippet vitest-test
```

#### Example with paths

```
plano generate react-component -p ./path/to/plano
```
