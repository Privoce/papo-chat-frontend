/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';

import _ from 'lodash';
import { useSelector, useDispatch } from 'react-redux';

import * as formActions from 'redux/actions/form';

function FormComponent({
  values,
  formName,
  debounceValidation,
  validateAsync,
  validate,
  render,
  handleSubmit: formHandleSubmit,
}) {
  const [debounces, setDebounces] = useState();

  const formData = useSelector((state) => state.form);

  const dispatch = useDispatch();

  function getFormData() {
    return formData[formName];
  }
  function updateFormData(params) {
    dispatch(
      formActions.updateForm(formName, {
        ...params,
      })
    );
  }

  function validateForm(resetErrors, keys) {
    const formDataTemp = getFormData();

    const { values: valuesFormData, errors: errorsFormData } = formDataTemp;

    updateFormData({
      errors: validate
        ? validate(valuesFormData, errorsFormData, resetErrors, keys)
        : {},
    });
  }

  function handleDebounceValidation(key, value) {
    const formDataTemp = getFormData();

    const { errors } = formDataTemp;

    if (!errors[key]) {
      validateAsync(key, value, formName);
      validateForm(true, [key]);
    }
  }

  function createDebounces() {
    const debouncesTemp = {};

    _.mapKeys(debounceValidation, (value, key) => {
      debouncesTemp[key] = _.debounce(handleDebounceValidation, value);
    });

    return debouncesTemp;
  }

  function setTouched(keys) {
    const formDataTemp = getFormData();
    const { touched } = formDataTemp;

    keys.forEach((key) => {
      touched[key] = true;
    });

    updateFormData({
      touched,
    });
  }

  function getMyFormParams() {
    const myFormParams = getFormData() || {
      values: {},
      errors: {},
      touched: {},
    };

    return myFormParams;
  }

  function handleChange(event) {
    event.preventDefault();

    const { name: key, value } = event.target;

    const formDataTemp = getFormData();
    const debounce = debounces[key];
    const { values: valuesFormData } = formDataTemp;

    valuesFormData[key] = value;

    updateFormData({
      values: valuesFormData,
    });
    setTouched([key]);
    validateForm(true, [key]);

    if (debounce) {
      debounce(key, value);
    }
  }

  function handleFocus(event) {
    event.preventDefault();
    const { name: key } = event.target;

    validateForm(false, [key]);
  }

  function handleBlur(event) {
    event.preventDefault();

    const { name: key } = event.target;

    setTouched([key]);
    validateForm(false, [key]);
  }

  function handleSubmit(event) {
    event.preventDefault();

    const formDataTemp = getFormData();
    const { values: valuesFormData, errors } = formDataTemp;

    validateForm(false, _.keys(valuesFormData));
    setTouched(_.keys(valuesFormData));

    if (_.isEmpty(errors)) {
      formHandleSubmit(valuesFormData, formName);
    }
  }

  const myFormParams = getMyFormParams();

  useEffect(() => {
    dispatch(
      formActions.initForm(formName, {
        values,
        errors: {},
        touched: {},
      })
    );
  }, []);

  useEffect(() => {
    setDebounces(createDebounces());
  }, [formData]);

  return (
    <>
      {render({
        handleBlur,
        handleChange,
        handleFocus,
        handleSubmit,
        debounces,
        form: { ...myFormParams },
      })}
    </>
  );
}

export default FormComponent;
