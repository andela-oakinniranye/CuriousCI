const GitHubApi = require('github');

const github = new GitHubApi()


const { pending, success, fail, error } = { pending: 'pending', success: 'success', fail: 'failure', error: 'error'}

const defaultBuildDescription = (state) => {
  switch( state ) {
    case pending:
      return "Build is pending"
    case success:
      return "Tests passed"
    case fail:
      return "Uh uh! Your tests failed"
    case error:
      return "Hmm! Unable to build"
  }
}

const defaultCallback = (err, res) => {
  console.log(err, res)
}

const attachState = (repo, state, token, { description = null, callback = defaultCallback } = additionalParams ) => {
  if( !repo ) {
    console.error("PR param should be set")
    return;
  }

  github.authenticate({
    type: 'token',
    token: token
  })

  if( !description ) description = defaultBuildDescription(state)
  if( !callback ) callback = defaultCallback

  return github.repos.createStatus({
    owner: repo.owner,
    repo: repo.name,
    sha: repo.sha,
    state: state,
    description: description
  }, callback)
}

exports.attachPendingState = (token, repo, callback) => {
  attachState(repo, pending, token, {callback})
}

exports.attachSuccessState = (token, repo, callback) => {
  attachState(repo, success, token, {callback})
}

exports.attachFailureState = (token, repo, callback) => {
  attachState(repo, fail, token, {callback})
}

exports.attachErrorState = (token, repo, callback) => {
  attachState(repo, error, token, {callback})
}
