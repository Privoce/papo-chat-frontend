import {
  POST_SIGNUP,
  POST_SIGNUP_RECEIVED,
  POST_SIGNIN,
  POST_SIGNIN_RECEIVED,
  GET_VERIFY_EMAIL,
  GET_VERIFY_EMAIL_RECEIVED,
  RESET_VERIFY_EMAIL,
  RESET_SIGNIN,
  POST_SIGNIN_GOOGLE,
  POST_SIGNUP_GOOGLE_RECEIVED,
} from 'redux/constants/auth';

export function postSignIn(params) {
  return {
    type: POST_SIGNIN,
    params,
  };
}

export function postSignInReceived(params) {
  return {
    type: POST_SIGNIN_RECEIVED,
    params,
  };
}

export function postSignInGoogle() {
  return {
    type: POST_SIGNIN_GOOGLE,
  };
}

export function postSignInGoogleReturn(params) {
  return {
    type: POST_SIGNUP_GOOGLE_RECEIVED,
    params,
  };
}

export function resetSignIn() {
  return {
    type: RESET_SIGNIN,
  };
}

export function postSignUp(params, formName) {
  return {
    type: POST_SIGNUP,
    params,
    formName,
  };
}

export function postSignUpReceived(params) {
  return {
    type: POST_SIGNUP_RECEIVED,
    params,
  };
}

export function getVerifyEmail(params) {
  return {
    type: GET_VERIFY_EMAIL,
    params,
  };
}

export function getVerifyEmailReceived(params) {
  return {
    type: GET_VERIFY_EMAIL_RECEIVED,
    params,
  };
}

export function resetVerifyEmail() {
  return {
    type: RESET_VERIFY_EMAIL,
  };
}
