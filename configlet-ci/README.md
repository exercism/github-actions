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
    - uses: actions/checkout@a81bbbf8298c0fa03ea29cdc473d45769f953675 # 2.3.3

    - name: Fetch configlet
      uses: exercism/github-actions/configlet-ci@master
      env:
        GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        
    - name: Configlet Linter
      run: configlet lint .

```
