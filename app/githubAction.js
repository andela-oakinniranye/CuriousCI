const github = require('github');

const { pending, success, failure } = { pending: 'pending', success: 'success', fail: 'failure', error: 'error'}

const defaultCallback = (err, res) => {
  console.log(err, res)
}

const attachState = (repo, state, token, { description, callback = defaultCallback } = additionalParams ) => {
  if( !repo ) {
    console.error("PR param should be set")
    return;
  }

  github.authenticate({
    type: 'token',
    token: token
  })

  github.repos.createStatus({
    owner: repo.owner,
    repo: repo.name,
    sha: repo.sha,
    status: state,
    description: description
  }, callback)
}

exports.attachPendingState = (token, repo) => {
  attachState(repo, pending, token)
}

exports.attachSuccessState = (token, repo) => {
  attachState(repo, success, token)
}

exports.attachFailureState = (token, repo) => {
  attachState(repo, fail, token)
}

exports.attachErrorState = (token, repo) => {
  attachState(repo, error, token)
}
