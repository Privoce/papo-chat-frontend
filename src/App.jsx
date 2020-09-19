import React from 'react';

import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';

import history from 'react-router/history';
import RoutesContainer from 'react-router/routes/index';
import store from 'redux/store';

function App() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <RoutesContainer />
      </Router>
    </Provider>
  );
}

export default App;
