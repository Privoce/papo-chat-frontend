import { toast } from 'react-toastify';
import { put, takeLatest } from 'redux-saga/effects';

import constants from 'modules/constants';
import { sendRequest, login } from 'modules/utils';
import * as authActions from 'redux/actions/auth';
import * as formActions from 'redux/actions/form';
import {
  POST_SIGNUP,
  POST_SIGNIN,
  GET_VERIFY_NICKNAME,
} from 'redux/constants/auth';

function* signInPostFetch(props) {
  const { params } = props;

  const { body } = params;

  try {
    const response = yield sendRequest({
      url: `${process.env.ROOT}${process.env.ACTIONS.AUTH_SIGNIN}`,
      method: process.env.METHODS.POST,
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
    toast.error(constants.LABELS.MAIN.GLOBAL_ERROR);
  }
}

function* signUpPostFetch(props) {
  const { params, formName } = props;

  const { body } = params;

  try {
    const response = yield sendRequest({
      url: `${process.env.ROOT}${process.env.ACTIONS.AUTH_SIGNUP}`,
      method: process.env.METHODS.POST,
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
      url: `${process.env.ROOT}${process.env.ACTIONS.VERIFY_NICKNAME}`,
      method: process.env.METHODS.GET,
      query: body,
    });

    yield put(
      formActions.setFormError(formName, {
        errors: response.errors,
      })
    );

    yield put(
      authActions.getVerifyNicknameReceived({
        errors: response.errors,
      })
    );
  } catch (e) {
    console.log(e);
    yield put(authActions.getVerifyNicknameReceived());
    toast.error(constants.LABELS.MAIN.GLOBAL_ERROR);
  }
}

const sagas = [
  takeLatest(POST_SIGNIN, signInPostFetch),
  takeLatest(POST_SIGNUP, signUpPostFetch),
  takeLatest(GET_VERIFY_NICKNAME, verifyNicknameGetFetch),
];

export default sagas;
