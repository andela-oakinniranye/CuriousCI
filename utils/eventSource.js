exports.getHandler = (event) => {
  if (event.pathParameters && event.pathParameters.proxy) {
    return require('../handlers/githubHandler.js')
  } else if (event.awslogs && event.awslogs.data) {
    return require('../handlers/codeBuildHandler.js')
  } else {
    return {}
  }
}
