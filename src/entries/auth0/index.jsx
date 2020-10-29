import React, { Component } from 'react';

import { useAuth0 } from '@auth0/auth0-react';

const { loginWithRedirect } = useAuth0();

export default class auth0 extends Component {
  handleClickSignInButton = () => {
    const { history } = this.props;

    history.push('/auth0');

    loginWithRedirect();
  };

  render() {
    return <button onClick={this.handleClickSignInButton}>Login</button>;
  }
}
