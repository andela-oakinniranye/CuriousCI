const AWS = require('aws-sdk');
const githubIntegration = require('../app/githubIntegration.js')
const { getRepoFromUrl } = require('../utils/urlUtils.js');
const { attachSuccessState, attachFailureState, attachErrorState } = require('../app/githubAction.js');

const statusMapping = {
                        "SUCCEEDED": attachSuccessState,
                        "FAILED":    attachFailureState,
                        "FAULT":     attachErrorState,
                        "STOPPED":   attachErrorState,
                        "TIMED_OUT": attachErrorState
                      }

const codebuildStatusHandler = (buildStatus) => statusMapping[buildStatus]

exports.handler = (event, context, callback) => {

  const repoUrl = event.source.location;
  const repoParams = getRepoFromUrl(repoUrl);
  const sourceVersion = event.sourceVersion;

  const repo = Object.assign({}, repoParams, { sha: sourceVersion });

  githubIntegration( ({data}) => {
    const { token } = data
    const githubAction = codebuildStatusHandler(event.buildStatus)

    githubAction(token, repo);
  })
};
