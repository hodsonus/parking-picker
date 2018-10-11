var GCM = require('node-crypto-gcm').GCM;

var cryptoOptions = {
  algorithm: 'aes-256-gcm',
  saltLength: 32,
  pbkdf2Rounds: 1000,
  pbkdf2Digest: 'sha512',
};

var content_secret = 'z4eVax3omXx0mGDELcdfEReFTWimmx';

function _decryptTokenContents(verifiedToken) {
  const cipher = new GCM(content_secret, cryptoOptions);
  const dec = cipher.decrypt(verifiedToken.contents);
  return JSON.parse(dec);
}

function _encryptTokenContents(contents) {
  const text = JSON.stringify(contents);
  const cipher = new GCM(content_secret, cryptoOptions);
  return cipher.encrypt(text);
}

// TODO modify to use new user acc setup
module.exports = {
  generateUserToken: function(user) {
    const contents = {
      _id: user._id,
    };
    const token = _encryptTokenContents(contents);

    return token;
  },
  getSession: function (token) {
    const tokenContents = _decryptTokenContents(token);

    if (!tokenContents) {
      return false;
    }

    return tokenContents;
  }
}
