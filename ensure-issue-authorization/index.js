const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
  try {
    const closeMessage = core.getInput('close-message');
    const lockMessage = core.getInput('lock-message');
    const lockPermission = core.getInput('lock-on-permission');
    const closePermission = core.getInput('close-on-permission');

    if (!closeMessage || !lockMessage || !lockPermission || !closePermission) {
      throw new Error('Action must set messages and permissions');
    }

    const client = new github.GitHub(
      core.getInput('repo-token', {required: true})
    );
    const context = github.context;
    const payload = context.payload;

    if (!payload.issue && payload.action !== 'opened') {
      core.debug('No issue was opened, skipping');
      return;
    }

    if (!payload.sender) {
      throw new Error('Internal error, no sender provided by GitHub');
    }

    const issue = context.issue
    const permission = await client.repos.getCollaboratorPermissionLevel({
      owner: issue.owner,
      repo: issue.repo,
      username: github.context.actor
    })
    const permissionLevel = permission.data.permission

    if (permissionLevel == closePermission) {
      core.debug(`Adding message: ${closeMessage} to Issue #${issue.number}`);

      await client.issues.createComment({
        owner: issue.owner,
        repo: issue.repo,
        issue_number: issue.number,
        body: closeMessage
      });

      core.debug('Closing issue');

      await client.issues.update({
        owner: issue.owner,
        repo: issue.repo,
        issue_number: issue.number,
        state: 'closed'
      });
    } else if (permissionLevel == lockPermission) {
      core.debug(`Adding message: ${lockMessage} to Issue #${issue.number}`);

      await client.issues.createComment({
        owner: issue.owner,
        repo: issue.repo,
        issue_number: issue.number,
        body: lockMessage
      });

      core.debug('Locking issue');

      await client.issues.lock({
        owner: issue.owner,
        repo: issue.repo,
        issue_number: issue.number
      });
    } else {
      core.debug('Issue was opened by authorized user, keeping issue open');
      return;
    }

  } catch (error) {
    core.setFailed(error.message);
    return;
  }
}

run();
