import React, { Component } from 'react';
import logo from '../../../assets/images/logo.png';
export default class AuthContainer extends Component {
  render() {
    const { title, formContainer, footerInfo, footerInfoLink } = this.props;

    return (
      <section className="auth-wrapper">
        <div className="form-container">
          <img src={logo} alt="Alora Main Logo" className="logo-image" />
          <h1 className="title">{title}</h1>
          {formContainer}
          <div className="info-container">
            {footerInfo}
            {footerInfoLink}
          </div>
        </div>
      </section>
    );
  }
}
