# Fetch Configlet Action

Download configlet and add it to the path.

## Usage

See [action.yml](action.yml).

### Example

```yaml
name: Configlet CI

on:
  push:
  pull_request:

jobs:
  configlet:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v2

    - name: Fetch configlet
      uses: exercism/github-actions/configlet-ci@main
        
    - name: Configlet Linter
      run: configlet lint

```
