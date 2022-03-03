# Exercism's GitHub Actions

A collection of custom GitHub actions used throughout Exercism.

## Reusable workflow: configlet

The `configlet` reusable workflow can be used to easily run [configlet][configlet] commands.
Currently, two commands are supported:

- `configlet lint`: check if a track's configuration files are properly structured (see [the docs][configlet-lint])
- `configlet fmt`: check if the track's files are properly formatted

### Inputs

The commands can be enabled or disabled via two boolean inputs:

| Name   | Description          | Type      | Required | Default |
| ------ | -------------------- | --------- | -------- | ------- |
| `lint` | Run `configlet lint` | `boolean` | No       | `true`  |
| `fmt`  | Run `configlet fmt`  | `boolean` | No       | `false` |

### Example: default (only linting)

```yaml
name: Configlet

on:
  pull_request:
  push:
    branches:
      - main
  workflow_dispatch:

permissions:
  contents: read

jobs:
  configlet:
    uses: exercism/github-actions/.github/workflows/configlet.yml@main
```

Note that the worklow will take care of everything, including checking out the code.
We've also explicitly set the permissions to just reading contents.

### Example: run linting and formatting

```yaml
name: Configlet

on:
  pull_request:
  push:
    branches:
      - main
  workflow_dispatch:

permissions:
  contents: read

jobs:
  configlet:
    uses: exercism/github-actions/.github/workflows/configlet.yml@main
    with:
      fmt: true
```

### Example: only formatting

```yaml
name: Configlet

on:
  pull_request:
  push:
    branches:
      - main
  workflow_dispatch:

permissions:
  contents: read

jobs:
  configlet:
    uses: exercism/github-actions/.github/workflows/configlet.yml@main
    with:
      lint: false
      fmt: true
```

[configlet]: https://exercism.org/docs/building/configlet
[configlet-lint]: https://exercism.org/docs/building/configlet/lint
