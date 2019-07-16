const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const serverConfig = require('./../configs/server');

const dataSecure = {
  passwordEncript: (password) => {
    return crypto
      .createHmac('sha256', serverConfig.passwordSecret)
      .update(password)
      .digest('hex');
  },

  jwtToken: (data) => {
    const tokenData = {
      body: data,
      createdAt: (new Date()).toString()
    }

    return jwt.sign(tokenData, serverConfig.tokenSecret);
  },

  jwtDecode: (jwtString) => {
    return jwt.verify(jwtString, serverConfig.tokenSecret);
  }
}

module.exports = dataSecure;