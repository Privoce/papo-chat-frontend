import React, { useEffect } from 'react';

import { useDispatch } from 'react-redux';

import loadingGif from 'assets/images/loading.gif';
import { postSignInGoogleReturn } from 'redux/actions/auth';

import './styles.scss';

function SocialAuth({ match }) {
  const { token } = match.params;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(postSignInGoogleReturn(token));
  }, []);

  return (
    <div className="loading-auth">
      <p>Loading...</p>
      <img src={loadingGif} alt="loading" />
    </div>
  );
}

export default SocialAuth;
