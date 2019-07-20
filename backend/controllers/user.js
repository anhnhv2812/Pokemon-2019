const joi = require('joi');
const _ = require('lodash');
const BaseController = require('./baseController');
const serverConfig = require('./../configs/server');
const dataSecure = require('./../core/dataSecure');

class User extends BaseController {
  constructor() {
    super();
    this.collection = 'users';
  }

  authorize(tokenString) {
    tokenString = _.isString(tokenString) ? tokenString.trim() : undefined;
    if (!tokenString) {
      return Promise.reject({ message: 'Invalid token' });
    }

    const decodedTokenData = dataSecure.jwtDecode(tokenString);
    const userId = _.get(decodedTokenData, 'body._id');

    if (!userId) {
      return Promise.reject({ message: 'Invalid token' });
    }

    return this.model.findOne({ _id: this.ObjectId(userId) });
  }

  async signup(userInfo) {
    try {
      const schema = joi.object().keys({
        username: joi.string().trim().required(),
        password: joi.string().required()
      });

      const validationResult = joi.validate(userInfo, schema);
      if (validationResult.error) {
        throw _.get(validationResult, 'error.details[0].message') || validationResult.error;
      }

      // Just a simple validation
      userInfo = validationResult.value;
      if (/[\s]/.test(userInfo.username)) {
        throw 'Username is invalid';
      }

      // Check password policy
      if (serverConfig.passwordPolicy && !serverConfig.passwordPolicy.test(userInfo.password)) {
        throw 'Password does not match the policy';
      }

      userInfo.password = dataSecure.passwordEncript(userInfo.password);
      const savedUser = await this.model.insertOne(userInfo);

      return _.merge(
        savedUser.ops[0],
        {
          token: dataSecure.jwtToken({
            _id: savedUser._id
          })
        }
      );
    } catch(error) {
      if (error.code === 11000) {
        error = 'This user existed'
      }
      return Promise.reject(error);
    }
  }

  async login(loginInfo) {
    try {
      const schema = joi.object().keys({
        username: joi.string().trim().required(),
        password: joi.string().required()
      });

      const validationResult = joi.validate(loginInfo, schema);
      if (validationResult.error) {
        throw _.get(validationResult, 'error.details[0].message') || validationResult.error;
      }

      const loggedUser = await this.model.findOne({
        username: validationResult.value.username,
        password: dataSecure.passwordEncript(validationResult.value.password)
      });

      if (!loggedUser) {
        throw 'Invalid username or password';
      }

      loggedUser.token = dataSecure.jwtToken({
        _id: loggedUser._id
      });
      delete loggedUser.password;
      delete loggedUser._id;

      return Promise.resolve(loggedUser);
    } catch(error) {
      if (error.code === 11000) {
        error = 'This user existed'
      }
      return Promise.reject(error);
    }
  }

  getList() {
    return this.model.find({}, { projection: { password: 0 } })
    .sort([ [ '_id', -1 ] ])  
    .toArray();
  }
}

module.exports = new User();