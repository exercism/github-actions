# Fetch Canonical Data Syncer Action

Download the canonical data syncer and add it to the path.

## Usage

See [action.yml](action.yml).

### Example

```yaml
name: Canonical Data Syncer CI

on:
  push:
  pull_request:

jobs:
  configlet:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v2

      - name: Fetch canonical data syncer
        uses: exercism/github-actions/canonical-data-syncer-ci@master

      - name: Canonical data check
        run: canonical_data_syncer --check
```
