import React, { useEffect } from 'react';

import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import loadingGif from 'assets/images/loading.gif';
import { postSignInGoogleReturn } from 'redux/actions/auth';

import './styles.scss';

function DirectCall({ match }) {
  const { user } = match.params;
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(postSignInGoogleReturn(user));
  }, []);

  return (
    <div className="loading-auth">
      <p>
        Calling to
        {user}
      </p>
      <img src={loadingGif} alt="loading" />
    </div>
  );
}

DirectCall.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({ user: PropTypes.string }),
  }).isRequired,
};

export default DirectCall;
