import React from 'react';

import { ToastContainer } from 'react-toastify';

function AppContainer({ children }) {
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

export default AppContainer;
