import {
  POST_SIGNUP,
  POST_SIGNUP_RECEIVED,
  POST_SIGNIN,
  POST_SIGNIN_RECEIVED,
  GET_VERIFY_EMAIL,
  GET_VERIFY_EMAIL_RECEIVED,
  RESET_VERIFY_EMAIL,
  RESET_SIGNIN,
} from 'redux/constants/auth';
import { RESET } from 'redux/constants/main';

const initialState = {
  signIn: {
    isFetching: false,
    errors: {},
  },
  signUp: {
    isFetching: false,
    errors: {},
  },
  verifyEmail: {
    isFetching: false,
    errors: {},
  },
};

function authReducer(state = initialState, action) {
  switch (action.type) {
    case POST_SIGNIN:
      return {
        ...state,
        signIn: { ...state.signIn, isFetching: true },
      };

    case POST_SIGNIN_RECEIVED:
      return {
        ...state,
        signIn: { ...state.signIn, isFetching: false, ...action.params },
      };

    case RESET_SIGNIN:
      return {
        ...state,
        signIn: { ...state.signIn, isFetching: false, errors: {} },
      };

    case POST_SIGNUP:
      return {
        ...state,
        signUp: { ...state.signUp, isFetching: true },
      };

    case POST_SIGNUP_RECEIVED:
      return {
        ...state,
        signUp: { ...state.signUp, isFetching: false },
      };

    case GET_VERIFY_EMAIL:
      return {
        ...state,
        verifyEmail: {
          ...state.verifyEmail,
          isFetching: true,
        },
      };

    case GET_VERIFY_EMAIL_RECEIVED:
      return {
        ...state,
        verifyEmail: {
          ...state.verifyEmail,
          isFetching: false,
          ...action.params,
        },
      };

    case RESET_VERIFY_EMAIL:
      return {
        ...state,
        verifyEmail: {
          isFetching: false,
          errors: {},
        },
      };

    case RESET:
      return initialState;

    default:
      return state;
  }
}

export default authReducer;
