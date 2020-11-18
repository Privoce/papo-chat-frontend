import React, { Component } from 'react';

import _ from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import constants from 'modules/constants';
import * as authActions from 'redux/actions/auth';
import {
  ButtonComponent,
  InputComponent,
  FormComponent,
  LoadingComponent,
  IconComponent,
} from 'shared/components';

class SignUpFormContainer extends Component {
  render() {
    const { authActions, authData } = this.props;

    const { getVerifyEmail, postSignUp } = authActions;

    const { verifyEmail, signUp } = authData;

    function validateEmail(email) {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    }

    return (
      <FormComponent
        formName="SignUpForm"
        values={{
          nickname: '',
          email: '',
          password: '',
          confirmPassword: '',
        }}
        handleSubmit={(values, formName) => {
          if (!signUp.isFetching) {
            const params = {
              body: values,
            };

            postSignUp(params, formName);
          }
        }}
        validate={(values, errors, resetErrors, keys) => {
          const { confirmPassword, nickname, password, email } = values;

          const newErrors = errors;

          if (_.includes(keys, 'email')) {
            if (resetErrors) {
              delete newErrors.email;
            }
            if (!email) {
              newErrors.email = constants.LABELS.AUTH.PLEASE_ENTER_YOUR_EMAIL;
            } else if (email.length < 10 || email.length > 100) {
              newErrors.email =
                constants.LABELS.AUTH.EMAIL_LENGHT_BETWEEN_2_AND_12;
            } else if (!validateEmail(email)) {
              newErrors.email = 'Insert a valid email';
            }
          }

          if (_.includes(keys, 'nickname')) {
            if (resetErrors) {
              delete newErrors.nickname;
            }
            if (!nickname) {
              newErrors.nickname =
                constants.LABELS.AUTH.PLEASE_ENTER_YOUR_NICKNAME;
            } else if (nickname.length < 2 || nickname.length > 12) {
              newErrors.nickname =
                constants.LABELS.AUTH.NICKNAME_LENGHT_BETWEEN_2_AND_12;
            }
          }

          if (
            _.includes(keys, 'password') ||
            _.includes(keys, 'confirmPassword')
          ) {
            if (resetErrors) {
              delete newErrors.password;
              delete newErrors.confirmPassword;
            }

            if (!password) {
              newErrors.password =
                constants.LABELS.AUTH.PLEASE_ENTER_YOUR_PASSWORD;
            } else if (password.length < 5 || password.length > 12) {
              newErrors.password =
                constants.LABELS.AUTH.PASSWORD_LENGHT_BETWEEN_5_AND_12;
            } else if (!confirmPassword) {
              newErrors.confirmPassword =
                constants.LABELS.AUTH.PLEASE_CONFIRM_PASSWORD;
            } else if (confirmPassword !== password) {
              newErrors.confirmPassword =
                constants.LABELS.AUTH.PASSWORD_DOESNT_MATCH;
            }
          }

          return newErrors;
        }}
        validateAsync={(key, value, formName) => {
          if (key === 'email') {
            const params = {
              body: {
                email: value,
              },
              formName,
            };

            getVerifyEmail({
              ...params,
            });
          }
        }}
        debounceValidation={{
          email: 300,
        }}
        render={({
          handleChange,
          handleFocus,
          handleBlur,
          handleSubmit,
          form,
        }) => {
          const { touched, errors, values } = form;

          return (
            <form onSubmit={handleSubmit}>
              <InputComponent
                name="email"
                placeholder={constants.LABELS.AUTH.EMAIL}
                type="text"
                hasError={touched.email && errors.email}
                errorMessage={errors.email}
                autoComplete="off"
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                margin="13px 0px 13px 0px"
                maxLength={100}
                width={280}
                defaultButton
                iconRight
                iconComponent={() => {
                  if (values.email) {
                    if (values.email.length > 0) {
                      if (verifyEmail.isFetching) {
                        return <LoadingComponent type="donut" />;
                      }

                      if (!_.isEmpty(verifyEmail.errors)) {
                        return (
                          <IconComponent
                            fill="#da7079"
                            icon="alert"
                            width={26}
                            height={26}
                          />
                        );
                      }

                      if (!(touched.email && errors.email)) {
                        return (
                          <IconComponent
                            fill="#55c37c"
                            icon="checked"
                            width={24}
                            height={24}
                          />
                        );
                      }
                    }
                  }

                  return null;
                }}
              />
              <InputComponent
                name="nickname"
                placeholder={constants.LABELS.AUTH.NICKNAME}
                type="text"
                hasError={touched.nickname && errors.nickname}
                errorMessage={errors.nickname}
                autoComplete="off"
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                margin="13px 0px 13px 0px"
                maxLength={12}
                width={280}
                defaultButton
              />
              <InputComponent
                name="password"
                placeholder={constants.LABELS.AUTH.PASSWORD}
                type="password"
                autoComplete="off"
                hasError={touched.password && errors.password}
                errorMessage={errors.password}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                maxLength={12}
                margin="13px 0px 13px 0px"
                width={280}
                defaultButton
              />
              <InputComponent
                name="confirmPassword"
                placeholder={constants.LABELS.AUTH.CONFIRM_PASSWORD}
                type="password"
                autoComplete="off"
                hasError={touched.confirmPassword && errors.confirmPassword}
                errorMessage={errors.confirmPassword}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                maxLength={12}
                margin="13px 0px 13px 0px"
                width={280}
                defaultButton
              />
              <ButtonComponent
                type="submit"
                primary
                text={constants.LABELS.AUTH.SIGNUP}
                isFetching={signUp.isFetching}
                disabled={verifyEmail.isFetching}
                margin="24px 0px 0px 0px"
                width={280}
              />
            </form>
          );
        }}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authData: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    authActions: bindActionCreators(authActions, dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUpFormContainer);
