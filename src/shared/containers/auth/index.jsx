import React from 'react';

import logo from '../../../assets/images/logo.png';

function AuthContainer({ title, formContainer, footerInfo, footerInfoLink }) {
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

export default AuthContainer;
