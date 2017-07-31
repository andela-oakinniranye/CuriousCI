const githubIntegration = require('../app/githubIntegration.js')
const { attachPendingState } = require('../app/githubAction.js')

const buildResponse = ({status = 200 , body = JSON.stringify({}) } = {}) => {
  return { statusCode: status, body: body}
}

const getRepo = (pullRequest) => {
  const dataSource = pullRequest.head
  const repo = dataSource.repo

  return {
    owner: repo.owner.login ,
    name: repo.name,
    sha: dataSource.sha
  }
}

exports.handler = (event, context, callback) => {
  if( !('pull_request' in event) ) {
    callback(null, buildResponse() )
  }

  githubIntegration( ({data}) => {
    const { token } = data
    const pullRequest = event.pull_request
    const repo = getRepo( pullRequest )

    attachPendingState(token, repo);
  })

};
