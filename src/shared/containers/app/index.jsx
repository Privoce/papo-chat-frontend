import React, { Component } from 'react';

import { ToastContainer } from 'react-toastify';

import { IconComponent, LabelComponent } from 'shared/components';

import constants from 'modules/constants';

export default class AppContainer extends Component {
  render() {
    const { children } = this.props;

    return (
      <div className="app-wrapper">
        <ToastContainer
          autoClose={10000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnVisibilityChange
          pauseOnHover
          draggable={false}
          position="top-right"
        />
        <div className="app-container">
          <div className="app-content">{children}</div>
        </div>
      </div>
    );
  }
}
