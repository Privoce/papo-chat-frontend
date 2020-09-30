import React, { useRef, useState, useEffect } from 'react';

import { Picker } from 'emoji-mart';
import PropTypes, { func } from 'prop-types';
import { Container, Button, Link } from 'react-floating-action-button';
import { AiOutlineMore } from 'react-icons/ai';
import { FiSend } from 'react-icons/fi';
import { HiEmojiHappy } from 'react-icons/hi';
import { MdCall } from 'react-icons/md';
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
      <Container>
        <Link href="#" tooltip="Create note link" icon="far fa-sticky-note" />
        <Link
          href="#"
          tooltip="Add user link"
          icon="fas fa-user-plus"
          className="fab-item btn btn-link btn-lg text-white"
        />
        <Button tooltip="The big plus button!" rotate>
          <AiOutlineMore />
        </Button>
      </Container>
      <button
        type="button"
        className="emoji-button"
        onClick={toggleEmojiWindow}
      >
        <HiEmojiHappy />
      </button>

      <button
        type="button"
        className="call-button icon-footer"
        onClick={handleCall}
      >
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
        placeholder="Type a message here..."
      />

      <button
        type="button"
        className="message-button icon-footer"
        onClick={handleEnter}
      >
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
  handleCall: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  currentConversation: PropTypes.object.isRequired,
};

export default ContentEditableComponent;
