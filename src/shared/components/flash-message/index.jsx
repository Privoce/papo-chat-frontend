import React, { useState } from 'react';

import classNames from 'classnames';
import PropTypes from 'prop-types';

import ButtonComponent from 'shared/components/button';
import IconComponent from 'shared/components/icon';

function FlashMessageComponent({
  onClose,
  width,
  message,
  margin,
  error,
  success,
}) {
  const [isActive, setIsActive] = useState(false);

  function handleClickClose() {
    onClose();
    setIsActive(false);
  }

  const flashMessageStyles = classNames({
    'flash-message-wrapper': true,
    error,
    success,
    closed: !isActive,
  });

  return (
    <div
      className={flashMessageStyles}
      style={{
        maxWidth: width,
        margin,
      }}
    >
      <span className="flash-message">{message}</span>
      <div className="button-container">
        <ButtonComponent
          type="button"
          width={26}
          height={26}
          link
          onClick={handleClickClose}
        >
          <IconComponent fill="#ffffff" icon="close" width={26} height={26} />
        </ButtonComponent>
      </div>
    </div>
  );
}

FlashMessageComponent.propTypes = {
  onClose: PropTypes.func,
  width: PropTypes.number,
  message: PropTypes.string.isRequired,
  margin: PropTypes.number,
  error: PropTypes.string,
  success: PropTypes.string,
};

FlashMessageComponent.defaultProps = {
  onClose: () => {},
  width: 0,
  margin: 0,
  error: '',
  success: '',
};

export default FlashMessageComponent;
