import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './style.scss';
import { MESSAGE, DEFAULT_HOME_PAGE } from './../../configs/constants';
import { userService } from './../../services';
import { flashError, flashSuccess } from './../../utils/dialog';
import { redirectTo } from './../../utils/redirect';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: ''
    }
  }

  handleSubmitError(error) {
    flashError(error.message || MESSAGE.UNDEFINED_ERROR);
  }

  handleSubmit() {
    const { password, username } = this.state;

    userService.login(username, password)
      .then(response => {
        flashSuccess('Login Success');
        redirectTo(DEFAULT_HOME_PAGE);
      })
      .catch(error => {
        this.handleSubmitError(error);
      })
  }

  render() {
    return (
      <div id="login-component" className="page-wrapper">
        <div className="component-wrapper">
          <div className="title">Sign In To Pokemon Trainer Account</div>
          <div className="form-component-wrapper">
            <div className="label">Username</div>
            <div className="component">
              <input type="text" onChange={(e) => this.setState({ username: e.target.value })}/>
            </div>
          </div>
          <div className="form-component-wrapper">
            <div className="label">Password</div>
            <div className="component">
              <input type="password" onChange={(e) => this.setState({ password: e.target.value })}/>
            </div>
          </div>
          
          <button className="login-btn btn btn--primary" onClick={() => this.handleSubmit()}>Sign In</button>
          <Link to="/signup">Don't have an account?</Link>
        </div>
      </div>
    );
  }
}

export default Login;
