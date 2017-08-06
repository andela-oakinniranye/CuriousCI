const AWS = require('aws-sdk');
const fs = require('fs');

const kms = new AWS.KMS({region:'us-east-1'});
const encryptedSecret = fs.readFileSync('./keys/encrypted.asc')

const kmsParams = {
  CiphertextBlob: Buffer(encryptedSecret, 'base64')
};

module.exports = (callback) => {
  kms.decrypt(kmsParams, (err, data) => {
    if (err) console.log(err, err.stack);
    else {
      const githubKey = data['Plaintext'].toString();

      callback(githubKey)
    }
  });

}
