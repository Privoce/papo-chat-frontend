/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/button-has-type */
import React from 'react';

import classNames from 'classnames';
import PropTypes from 'prop-types';

import LoadingComponent from 'shared/components/loading';

function ButtonComponent({
  text,
  primary,
  link,
  width,
  onClick,
  type,
  isFetching,
  disabled,
  children,
  margin,
  defaultButton,
  outline,
  small,
  setRef,
}) {
  const buttonStyles = classNames({
    button: true,
    'button--primary': primary && !disabled,
    'button--disabled': disabled,
    'button--link': link,
    'button--default': defaultButton && !disabled,
    outline,
    small,
  });

  return (
    <button
      onClick={(event) => {
        event.stopPropagation();
        if (onClick) {
          onClick(event);
        }
      }}
      className={buttonStyles}
      style={{
        width,
        margin,
      }}
      type={type}
      disabled={disabled}
      ref={setRef}
    >
      {isFetching && !disabled ? <LoadingComponent type="spinner" /> : text}
      {children}
    </button>
  );
}

ButtonComponent.propTypes = {
  text: PropTypes.string,
  primary: PropTypes.bool,
  link: PropTypes.bool,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onClick: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  isFetching: PropTypes.bool,
  disabled: PropTypes.bool,
  children: PropTypes.object.isRequired,
  margin: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  defaultButton: PropTypes.bool,
  outline: PropTypes.bool,
  small: PropTypes.bool,
  setRef: PropTypes.func,
};

ButtonComponent.defaultProps = {
  text: '',
  margin: '0',
  primary: false,
  link: false,
  isFetching: false,
  disabled: false,
  defaultButton: false,
  outline: false,
  small: false,
  setRef: null,
};

export default ButtonComponent;
