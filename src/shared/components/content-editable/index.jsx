import React, { useRef, useState } from 'react';

import { Picker } from 'emoji-mart';
import PropTypes from 'prop-types';
import { FiSend } from 'react-icons/fi';
import { HiEmojiHappy } from 'react-icons/hi';
import { MdCall } from 'react-icons/md';
import useOnClickOutside from 'use-onclickoutside';

function ContentEditableComponent({ onEnter, onFocus, handleCall }) {
  const contentEditable = useRef(null);
  const emojiWindow = useRef(null);
  const [showEmojis, setShowEmojis] = useState(false);

  function toggleEmojiWindow() {
    setShowEmojis(!showEmojis);
  }

  useOnClickOutside(emojiWindow, toggleEmojiWindow);

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

  function setEmoji(emoji) {
    contentEditable.current.textContent += emoji.native;
  }

  return (
    <>
      <button type="button" className="call-button" onClick={handleCall}>
        <MdCall />
      </button>
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
      <button
        type="button"
        className="emoji-button"
        onClick={toggleEmojiWindow}
      >
        <HiEmojiHappy />
      </button>

      <button type="button" className="message-button" onClick={handleEnter}>
        <FiSend />
      </button>

      {showEmojis && (
        <div ref={emojiWindow}>
          <Picker
            onSelect={setEmoji}
            style={{ position: 'absolute', bottom: '20px', right: '20px' }}
            showPreview={false}
            emojiTooltip={false}
            title=""
            emoji=""
          />
        </div>
      )}
    </>
  );
}

ContentEditableComponent.propTypes = {
  onEnter: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
};

export default ContentEditableComponent;
