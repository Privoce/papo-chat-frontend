import { toast } from 'react-toastify';
import { put, takeLatest } from 'redux-saga/effects';

import constants from 'modules/constants';
import { sendRequest, login } from 'modules/utils';
import * as authActions from 'redux/actions/auth';
import * as formActions from 'redux/actions/form';
import {
  POST_SIGNUP,
  POST_SIGNIN,
  GET_VERIFY_EMAIL,
  POST_SIGNIN_GOOGLE,
  POST_SIGNUP_GOOGLE_RECEIVED,
} from 'redux/constants/auth';

function* signInPostFetch(props) {
  const { params } = props;

  const { body } = params;

  try {
    const response = yield sendRequest({
      url: `${process.env.REACT_APP_AUTH_URL}/auth/signin`,
      method: constants.API.METHODS.POST,
      body,
    });

    yield put(
      authActions.postSignInReceived({
        errors: response.errors,
      })
    );

    if (response.success && response.token && response.user) {
      login(response.token, response.user);
    }
  } catch (e) {
    yield put(authActions.postSignInReceived());
    console.log(e);
    toast.error(constants.LABELS.MAIN.GLOBAL_ERROR);
  }
}

function* signInGooglePostFetch() {
  try {
    yield sendRequest({
      url: `${process.env.REACT_APP_AUTH_URL}/auth/google`,
      method: constants.API.METHODS.GET,
    });
  } catch (e) {
    toast.error('Error on social login');
  }
}

// set login infos after google callback
function* signInGoogleReturn(token) {
  try {
    const response = yield sendRequest({
      url: `${process.env.REACT_APP_AUTH_URL}/auth/me`,
      method: constants.API.METHODS.GET,
      forceToken: token,
    });

    if (response.user) {
      login(response.token, response.user);
    }
  } catch (e) {
    console.log(e);
    toast.error('Error on social login callback');
  }
}

function* signUpPostFetch(props) {
  const { params, formName } = props;

  const { body } = params;

  try {
    const response = yield sendRequest({
      url: `${process.env.REACT_APP_AUTH_URL}${constants.API.ACTIONS.AUTH_SIGNUP}`,
      method: constants.API.METHODS.POST,
      body,
    });

    yield put(
      formActions.setFormError(formName, {
        errors: response.errors,
      })
    );

    yield put(authActions.postSignUpReceived());

    if (response.success && response.token && response.user) {
      login(response.token, response.user);
    }
  } catch (e) {
    console.log(e);
    yield put(authActions.postSignUpReceived());
    toast.error(constants.LABELS.MAIN.GLOBAL_ERROR);
  }
}

function* verifyNicknameGetFetch(props) {
  const { params } = props;

  const { body, formName } = params;

  try {
    const response = yield sendRequest({
      url: `${process.env.REACT_APP_AUTH_URL}${constants.API.ACTIONS.VERIFY_NICKNAME}`,
      method: constants.API.METHODS.GET,
      query: body,
    });

    yield put(
      formActions.setFormError(formName, {
        errors: response.errors,
      })
    );

    yield put(
      authActions.getVerifyEmailReceived({
        errors: response.errors,
      })
    );
  } catch (e) {
    yield put(authActions.getVerifyEmailReceived());
    toast.error(constants.LABELS.MAIN.GLOBAL_ERROR);
  }
}

const sagas = [
  takeLatest(POST_SIGNIN, signInPostFetch),
  takeLatest(POST_SIGNUP, signUpPostFetch),
  takeLatest(GET_VERIFY_EMAIL, verifyNicknameGetFetch),
  takeLatest(POST_SIGNIN_GOOGLE, signInGooglePostFetch),
  takeLatest(POST_SIGNUP_GOOGLE_RECEIVED, signInGoogleReturn),
];

export default sagas;
