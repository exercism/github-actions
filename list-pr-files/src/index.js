const core = require("@actions/core");
const github = require("@actions/github");

async function main() {
  try {
    const token = core.getInput("token");
    const githubClient = new github.GitHub(token);

    const contextPayload = github.context.payload;

    const endpointOptions = githubClient.pulls.listFiles.endpoint.merge({
      owner: contextPayload.repository.owner.login,
      repo: contextPayload.repository.name,
      pull_number: contextPayload.pull_request.number,
    });

    const files = await githubClient.paginate(endpointOptions, (response) =>
      response.data.map((file) => file.filename)
    );

    core.setOutput("files", JSON.stringify(files));
  } catch (error) {
    core.setFailed(error.message);
  }
}

main();
