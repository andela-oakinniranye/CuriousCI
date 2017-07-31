const jwt = require('jsonwebtoken');
const kmsHandler = require('./kmsHandler.js');
const axios = require('axios');

const appId = process.env.GITHUB_APP_ID;
const installationId = process.env.GITHUB_INSTALLATION_ID

const getConfig = (token) => {
  return {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/vnd.github.machine-man-preview+json',
      'User-Agent': 'CuriousCI'

    }
  }
}

const getAccessToken = (jwtToken) => {
  const installationEndpoint = `https://api.github.com/installations/${installationId}/access_tokens`

  return axios.post(installationEndpoint, {},  getConfig(jwtToken) )
}

module.exports = (callback) => {
  kmsHandler( (githubKey) => {
    const jwtToken = jwt.sign({ iss: appId },
      githubKey, {
        algorithm: 'RS256',
        expiresIn: '10m'
      });

      getAccessToken(jwtToken).then(callback)
  })
}
