import React, { useRef, useState, useEffect } from 'react';

import { Picker } from 'emoji-mart';
import PropTypes, { func } from 'prop-types';
import { FiSend } from 'react-icons/fi';
import { GrEmoji } from 'react-icons/gr';
import { HiEmojiHappy } from 'react-icons/hi';
import { MdCall, MdAttachment, MdTagFaces, MdSend } from 'react-icons/md';
import { Fab, Action } from 'react-tiny-fab';
import useOnClickOutside from 'use-onclickoutside';

function ContentEditableComponent({
  onEnter,
  onFocus,
  handleCall,
  currentConversation,
}) {
  const contentEditable = useRef(null);
  const emojiWindow = useRef(null);
  const [showEmojis, setShowEmojis] = useState(false);
  let emojisShowing = false;

  useEffect(() => {
    contentEditable.current.textContent = '';
    contentEditable.current.focus();
  }, [currentConversation]);

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
      <button
        type="button"
        className="emoji-button"
        onClick={toggleEmojiWindow}
      >
        <MdTagFaces />
      </button>
      <Fab
        mainButtonStyles={{
          background: '#fff',
          color: '#4064d1',
          boxShadow: 'none',
          fontSize: 28,
          margin: 0,
          padding: 0,
        }}
        actionButtonStyles={{ margin: 0, padding: 0 }}
        style={{
          position: 'relative',
          padding: 0,
          margin: 20,
          zIndex: 30,
        }}
        icon={<MdAttachment />}
        alwaysShowTitle
      >
        <Action
          onClick={handleCall}
          className="fab-callaction-button"
          style={{
            background: '#0838C7'
          }}
        >
          <MdCall />
        </Action>
      </Fab>
      <div
        contentEditable
        className="content-editable"
        role="button"
        spellCheck
        ref={contentEditable}
        onKeyDown={handleKeyDown}
        onFocus={onFocus}
        tabIndex="-1"
        placeholder="Type a message here..."
      />
      <button
        type="button"
        className="message-button icon-footer"
        onClick={handleEnter}
      >
        <MdSend
          className="message-icon"
        />
      </button>
      {showEmojis && (
        <div ref={emojiWindow}>
          <Picker
            onSelect={setEmoji}
            style={{ position: 'absolute', bottom: '90px', left: '20px' }}
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
  handleCall: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  currentConversation: PropTypes.object.isRequired,
};

export default ContentEditableComponent;
