import request from 'request';
import _ from 'lodash';
import config from './../configs/config'

class Api {
  constructor() {
    this.request = request.defaults({
      json: true,
      baseUrl: `${config.serverUrl}${config.defaultApiMountPath}`
    });
  }

  setToken(requestOptions) {
    const token = localStorage.getItem('token');
    if (token) {
      requestOptions.headers = {
        'Authorization': token
      }
    }
  }
  
  post(url, data, options) {
    const requestOptions = {};
    this.setToken(requestOptions);
    if (data) {
      requestOptions.body = data;
    }

    return new Promise((resolve, reject) => {
      this.request.post(url, requestOptions, (error, response, body) => {
        if (error) {
          return reject(error);
        }

        if (response.statusCode !== 200) {
          return reject(body);
        }

        resolve(body);
      });
    });
  }

  get(url, params = null) {
    const requestOptions = {};
    this.setToken(requestOptions);

    if (_.isObject(params)) {
      requestOptions.qs = params;
    }

    return new Promise((resolve, reject) => {
      this.request.get(url, requestOptions, (error, response, body) => {
        if (error) {
          return reject(error);
        }

        if (response.statusCode !== 200) {
          return reject(body);
        }

        resolve(body);
      });
    });
  }
}

export default new Api();