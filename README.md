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
  push:
  pull_request:

jobs:
  configlet:
    uses: exercism/github-actions/.github/workflows/configlet.yml@main
```

Note that the worklow will take care of everything, including checking out the code.

### Example: run linting and formatting

```yaml
name: Configlet

on:
  push:
  pull_request:

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
  push:
  pull_request:

jobs:
  configlet:
    uses: exercism/github-actions/.github/workflows/configlet.yml@main
    with:
      lint: false
      fmt: true
```

## Reusable workflow: docker-build-push-image

The `docker-build-push-image` reusable workflow can be used to easily build and push a repository's Docker image to AWS ECR and/or Docker Hub.

### Inputs

Which registry you want the built image to be pushed to can be enabled or disabled via two boolean inputs:

| Name         | Description        | Type      | Required | Default |
| ------------ | ------------------ | --------- | -------- | ------- |
| `aws_ecr`    | Push to AWS ECR    | `boolean` | False    | `true`  |
| `docker_hub` | Push to Docker Hub | `boolean` | False    | `true`  |

### Secrets

Which registry you want the built image to be pushed to can be enabled or disabled via two boolean inputs:

| Name                        | Description                                           | Type     | Required |
| --------------------------- | ----------------------------------------------------- | -------- | -------- |
| `AWS_ACCOUNT_ID`            | The AWS account ID used to determine the ECR registry | `string` | Yes      |
| `AWS_REGION`                | The AWS region used to determine the ECR registry     | `string` | Yes      |
| `AWS_ECR_ACCESS_KEY_ID`     | The access key ID used to log into AWS ECR            | `string` | Yes      |
| `AWS_ECR_SECRET_ACCESS_KEY` | The secret access key ID used to log into AWS ECR     | `string` | Yes      |
| `DOCKERHUB_USERNAME`        | The username used to log into Docker Hub              | `string` | Yes      |
| `DOCKERHUB_PASSWORD`        | The password used to log into Docker Hub              | `string` | Yes      |

### Example: default (push to AWS ECR and Docker Hub)

```yaml
name: Build and Push Docker image

on:
  pull_request:
    branches:
      - main
  push:
    branches:
      - main
  workflow_dispatch:

permissions:
  contents: write

jobs:
  build-and-push-image:
    uses: exercism/github-actions/.github/workflows/docker-build-push-image.yml@main
    secrets:
      AWS_ACCOUNT_ID: ${{secrets.AWS_ACCOUNT_ID}}
      AWS_REGION: ${{secrets.AWS_REGION}}
      AWS_ECR_ACCESS_KEY_ID: ${{secrets.AWS_ECR_ACCESS_KEY_ID}}
      AWS_ECR_SECRET_ACCESS_KEY: ${{secrets.AWS_ECR_SECRET_ACCESS_KEY}}
      DOCKERHUB_USERNAME: ${{secrets.DOCKERHUB_USERNAME}}
      DOCKERHUB_PASSWORD: ${{secrets.DOCKERHUB_PASSWORD}}
```

### Example: only push to AWS ECR

```yaml
name: Build and Push Docker image

on:
  pull_request:
    branches:
      - main
  push:
    branches:
      - main
  workflow_dispatch:

permissions:
  contents: write

jobs:
  build-and-push-image:
    uses: exercism/github-actions/.github/workflows/docker-build-push-image.yml@main
    with:
      docker_hub: false
    secrets:
      AWS_ACCOUNT_ID: ${{secrets.AWS_ACCOUNT_ID}}
      AWS_REGION: ${{secrets.AWS_REGION}}
      AWS_ECR_ACCESS_KEY_ID: ${{secrets.AWS_ECR_ACCESS_KEY_ID}}
      AWS_ECR_SECRET_ACCESS_KEY: ${{secrets.AWS_ECR_SECRET_ACCESS_KEY}}
      DOCKERHUB_USERNAME: ${{secrets.DOCKERHUB_USERNAME}}
      DOCKERHUB_PASSWORD: ${{secrets.DOCKERHUB_PASSWORD}}
```

### Example: only push to Docker Hub

```yaml
name: Build and Push Docker image

on:
  pull_request:
    branches:
      - main
  push:
    branches:
      - main
  workflow_dispatch:

permissions:
  contents: write

jobs:
  build-and-push-image:
    uses: exercism/github-actions/.github/workflows/docker-build-push-image.yml@main
    with:
      aws_ecr: false
    secrets:
      AWS_ACCOUNT_ID: ${{secrets.AWS_ACCOUNT_ID}}
      AWS_REGION: ${{secrets.AWS_REGION}}
      AWS_ECR_ACCESS_KEY_ID: ${{secrets.AWS_ECR_ACCESS_KEY_ID}}
      AWS_ECR_SECRET_ACCESS_KEY: ${{secrets.AWS_ECR_SECRET_ACCESS_KEY}}
      DOCKERHUB_USERNAME: ${{secrets.DOCKERHUB_USERNAME}}
      DOCKERHUB_PASSWORD: ${{secrets.DOCKERHUB_PASSWORD}}
```

[configlet]: https://exercism.org/docs/building/configlet
[configlet-lint]: https://exercism.org/docs/building/configlet/lint
