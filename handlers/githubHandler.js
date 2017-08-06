const githubIntegration = require('../app/githubIntegration.js')
const { attachPendingState } = require('../app/githubAction.js')

const buildResponse = ({status = 200 , body = JSON.stringify({}) } = {}) => {
  return { statusCode: status, body: body}
}

const getRepo = (pullRequest) => {
  const { head } = pullRequest
  const { repo } = head

  return {
    owner: repo.owner.login ,
    name: repo.name,
    sha: head.sha
  }
}

const cbWrapper = (callback) => {
  return (err, res) => {
    const status = 200
    const body = res
    const response = {body, status}

    callback(err, buildResponse(response))
  }
}

exports.handler = (event, context, callback) => {
  const payload = JSON.parse( event.body )

  if( !('pull_request' in payload) ) {
    callback(null, buildResponse() )
  }

  githubIntegration( ({data}) => {
    const { token } = data
    const pullRequest = payload.pull_request
    const repo = getRepo( pullRequest )

    attachPendingState(token, repo, cbWrapper(callback) );
  })

};
