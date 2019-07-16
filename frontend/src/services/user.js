import _ from 'lodash';
import { MESSAGE } from './../configs/constants';
import api from './../core/api';

class userService {
  async login(username, password) {
    try {
      if (!password || !username.trim()) {
        throw { message: MESSAGE.ERROR_REQUIRE_PASSWORD_AND_USERNAME };
      }

      const loggedUser = await api.post('/login', { username, password });

      if (!_.get(loggedUser, 'token')) {
        return Promise.reject({ message: MESSAGE.UNDEFINED_ERROR });
      }

      localStorage.setItem('token', loggedUser.token);
      return Promise.resolve(loggedUser);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async signup(userData) {
    const { username, password } = userData;
    try {
      if (!password || !username.trim()) {
        throw { message: MESSAGE.ERROR_REQUIRE_PASSWORD_AND_USERNAME };
      }

      const savedUser = await api.post('/signup', { username, password });

      if (!_.get(savedUser, '_id')) {
        return Promise.reject({ message: MESSAGE.UNDEFINED_ERROR });
      }

      return Promise.resolve(savedUser);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export default new userService();