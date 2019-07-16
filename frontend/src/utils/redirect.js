import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

let redirectHandle;

class RedirectTo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectTo: null
    };
  }

  componentDidMount() {
    redirectHandle = (toRoute) => {
      this.setState({ 
        redirectTo: toRoute
      });
    }
  }

  render() {
    const redirectTo = this.state.redirectTo;
    return redirectTo ? <Redirect to={redirectTo}/> : '';
  }
}

export default RedirectTo;

export const redirectTo = (toRoute) => {
  redirectHandle(toRoute);
}