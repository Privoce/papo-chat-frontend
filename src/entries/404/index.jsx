import React, { Component } from 'react';

import Error from '../../assets/images/404-error.svg';
import './styles.scss';
import ButtonComponent from '../../shared/components/button';

export default class Page404 extends Component {
  handleClickHomeButton = () => {
    const { history } = this.props;

    history.push('/');
  };

  render() {
    return (
      <div id="page404">
        <h1>There's nothing to see here...</h1>
        <img src={Error} alt="Page not Found" />
        <ButtonComponent
          text="Return to Home"
          link
          width={80}
          onClick={this.handleClickHomeButton}
        />
      </div>
    );
  }
}
