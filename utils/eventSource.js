exports.getHandler = (event) => {
  if ( event.headers && event.headers['X-GitHub-Event'] === 'pull_request' ) {
    return require('../handlers/githubHandler.js')
  } else if (event.awslogs && event.awslogs.data) {
    return require('../handlers/codeBuildHandler.js')
  } else {
    return {}
  }
}
