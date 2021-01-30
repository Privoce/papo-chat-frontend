/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';

import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

import { getToken } from 'modules/utils';

function renderRoute({ props, protectedRoute, component: Component }) {
  const { history, location } = props;

  const Workaround = ({ action, children }) =>
    action === 'REPLACE' ? null : children;

  const token = getToken();

  if (!token && protectedRoute) {
    return (
      <Workaround action={history.action}>
        <Redirect
          to={{
            pathname: 'signin',
            state: { from: location },
          }}
        />
      </Workaround>
    );
  }

  if (token && !protectedRoute) {
    return (
      <Workaround action={history.action}>
        <Redirect
          to={{
            pathname: '/',
            state: { from: location },
          }}
        />
      </Workaround>
    );
  }

  return <Component {...props} />;
}

function CustomRoute({ protectedRoute, component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => renderRoute({ props, protectedRoute, component })}
    />
  );
}

renderRoute.propTypes = {
  props: PropTypes.shape({
    history: PropTypes.shape({
      action: PropTypes.string,
    }),
    location: PropTypes.string,
  }),
  protectedRoute: PropTypes.bool,
  component: PropTypes.func.isRequired,
};

renderRoute.defaultProps = {
  protectedRoute: false,
};

CustomRoute.propTypes = {
  protectedRoute: PropTypes.bool,
  component: PropTypes.func.isRequired,
};

CustomRoute.defaultProps = {
  protectedRoute: false,
};

export default CustomRoute;
