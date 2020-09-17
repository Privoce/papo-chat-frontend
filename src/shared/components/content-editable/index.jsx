import React, { useRef } from 'react';
import PropTypes from 'prop-types';

function ContentEditableComponent({ onEnter, onFocus }) {
  const contentEditable = useRef(null);

  function handleEnter() {
    onEnter(contentEditable.current.textContent);
    contentEditable.current.textContent = '';
  }

  function handleKeyDown(event) {
    if (event.which === 13 && event.shiftKey === false) {
      event.preventDefault();
      handleEnter();
      return false;
    }

    return true;
  }

  return (
    <div
      contentEditable
      className="content-editable"
      role="button"
      spellCheck
      ref={contentEditable}
      onKeyDown={handleKeyDown}
      onFocus={onFocus}
      tabIndex="-1"
    />
  );
}

ContentEditableComponent.propTypes = {
  onEnter: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
};

export default ContentEditableComponent;
