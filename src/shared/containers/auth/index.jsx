import React from 'react';

function AuthContainer({ title, formContainer, footerInfo, footerInfoLink }) {
  return (
    <section className="auth-wrapper">
      <div className="form-container">
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
