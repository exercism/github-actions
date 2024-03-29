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

## Reusable workflow: docker-build-push-image

The `docker-build-push-image` reusable workflow can be used to easily build and push a repository's Docker image to AWS ECR and/or Docker Hub.

### Inputs

Which registry you want the built image to be pushed to can be enabled or disabled via two boolean inputs:

| Name         | Description        | Type      | Required | Default |
| ------------ | ------------------ | --------- | -------- | ------- |
| `aws_ecr`    | Push to AWS ECR    | `boolean` | False    | `true`  |
| `docker_hub` | Push to Docker Hub | `boolean` | False    | `true`  |

### Secrets

These are the secrets that the workflow requires:

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

## Reusable workflow: deploy-lambda

The `deploy-lambda` reusable workflow can be used to easily deploy a lambda function to AWS ECR.

### Inputs

There are the input parameters:

| Name            | Description                        | Type     | Required |
| --------------- | ---------------------------------- | -------- | -------- |
| `function_name` | The name of the function to deploy | `string` | True     |

### Secrets

These are the secrets that the workflow requires:

| Name                        | Description                                           | Type     | Required |
| --------------------------- | ----------------------------------------------------- | -------- | -------- |
| `AWS_ACCOUNT_ID`            | The AWS account ID used to determine the ECR registry | `string` | Yes      |
| `AWS_REGION`                | The AWS region used to determine the ECR registry     | `string` | Yes      |
| `AWS_ECR_ACCESS_KEY_ID`     | The access key ID used to log into AWS ECR            | `string` | Yes      |
| `AWS_ECR_SECRET_ACCESS_KEY` | The secret access key ID used to log into AWS ECR     | `string` | Yes      |

### Example: default

```yaml
name: Push Docker images to DockerHub and ECR and deploy to AWS

on:
  push:
    branches:
      - main
  pull_request:
  workflow_dispatch:

permissions:
  contents: write

jobs:
  build-and-push-image:
    uses: exercism/github-actions/.github/workflows/docker-build-push-image.yml@main
    secrets:
      AWS_ACCOUNT_ID: ${{secrets.AWS_ACCOUNT_ID}}
      AWS_REGION: ${{secrets.AWS_REGION}}
      AWS_ECR_ACCESS_KEY_ID: ${{secrets.AWS_LAMBDA_ACCESS_KEY_ID}}
      AWS_ECR_SECRET_ACCESS_KEY: ${{secrets.AWS_LAMBDA_SECRET_ACCESS_KEY}}
      DOCKERHUB_USERNAME: ${{secrets.DOCKERHUB_USERNAME}}
      DOCKERHUB_PASSWORD: ${{secrets.DOCKERHUB_PASSWORD}}

  deploy-lambda:
    uses: exercism/github-actions/.github/workflows/deploy-lambda.yml@main
    needs: build-and-push-image
    with:
      function_name: snippet_extractor
    secrets:
      AWS_ACCOUNT_ID: ${{secrets.AWS_ACCOUNT_ID}}
      AWS_REGION: ${{secrets.AWS_REGION}}
      AWS_ECR_ACCESS_KEY_ID: ${{secrets.AWS_LAMBDA_ACCESS_KEY_ID}}
      AWS_ECR_SECRET_ACCESS_KEY: ${{secrets.AWS_LAMBDA_SECRET_ACCESS_KEY}}
```

Note that the deploy lambda workflow depends on the Docker image already having been pushed to ECR, which is done in the `build-and-push-image` job.

## Reusable workflow: labels

The `labels` reusable workflow can be used to sync the repository's labels via its `.github/labels.yml` file.

### Example

```yaml
name: Tools

on:
  push:
    branches:
      - main
    paths:
      - .github/labels.yml
      - .github/workflows/sync-labels.yml
  workflow_dispatch:
  schedule:
    - cron: 0 0 1 * * # First day of each month

permissions:
  issues: write

jobs:
  sync-labels:
    uses: exercism/github-actions/.github/workflows/labels.yml@main
```

[configlet]: https://exercism.org/docs/building/configlet
[configlet-lint]: https://exercism.org/docs/building/configlet/lint
