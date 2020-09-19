import React, { useEffect, useState } from 'react';
import './styles.scss';

import PropTypes from 'prop-types';
import { MdCall, MdCameraAlt, MdCancel } from 'react-icons/md';

import placeholderImg from '../../../assets/images/no-picture.png';

function StartCallWindow({ startCall, image, conversationData, cancel }) {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const {
      currentPartnerIdConversation,
      result: conversations,
    } = conversationData;

    const currentConversation = conversations.find(
      (item) =>
        String(item.partnerId._id) === String(currentPartnerIdConversation)
    );

    console.log(currentConversation.partnerId);

    setCurrentUser(currentConversation.partnerId);
  }, [conversationData]);

  return (
    <div className="start-call-container">
      <img src={image || placeholderImg} alt="User profile" />
      <h2>Ligar para</h2>
      <p>{currentUser.nickname || 'Usuario'}</p>
      <div className="button-container">
        <button type="button" onClick={() => startCall('audio')}>
          <MdCall />
        </button>
        <button type="button" onClick={() => startCall('video')}>
          <MdCameraAlt />
        </button>
        <button type="button" onClick={cancel}>
          <MdCancel />
        </button>
      </div>
    </div>
  );
}

StartCallWindow.propTypes = {
  startCall: PropTypes.func.isRequired,
};

export default StartCallWindow;
