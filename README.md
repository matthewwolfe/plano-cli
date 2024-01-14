# Plano CLI

A CLI and programmatic API for generating files and/or directories from
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
Usage: plano generate [options] [name]

Generate files or directories from a template

Arguments:
  name                   template name

Options:
  -p, --paths <path...>  Paths to templates, must be directory named "plano" (default: [])
  -h, --help             display help for command
```

#### Example

```
plano generate react-component
```

#### Example with paths

```
plano generate react-component -p ./path/to/plano
```
