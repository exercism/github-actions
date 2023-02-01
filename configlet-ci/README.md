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
      # GITHUB_TOKEN is not set when we run the fetch script, because we're in
      # a composite action. Set GH_TOKEN so that `gh release download` can
      # make authenticated requests (it fails otherwise).
      env:
        GH_TOKEN: ${{ github.token }}

    - name: Configlet Linter
      run: configlet lint

```
