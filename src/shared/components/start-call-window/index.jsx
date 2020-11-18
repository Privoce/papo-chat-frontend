import React, { useEffect, useState } from 'react';
import './styles.scss';

import PropTypes from 'prop-types';
import { MdCall, MdCameraAlt, MdCancel } from 'react-icons/md';

import placeholderImg from '../../../assets/images/no-picture.png';

function StartCallWindow({
  startCall,
  image,
  conversationData,
  cancel,
  calling,
}) {
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

    setCurrentUser(currentConversation.partnerId);
  }, [conversationData]);

  return (
    <div className="start-call-container">
      <h2>{currentUser.nickname || 'User'}</h2>
      <p>Make a call</p>
      <img src={image || placeholderImg} alt="User profile" />
      <div className="button-container">
        <button className="button-cancelcall" type="button" onClick={cancel}>
          <MdCancel />
        </button>

        <button
          className="button-videocall"
          type="button"
          onClick={() => startCall('video')}
        >
          <MdCameraAlt />
        </button>
      </div>
      <button
        className="button-audiocall"
        type="button"
        onClick={() => startCall('audio')}
      >
        <MdCall />
      </button>
    </div>
  );
}

StartCallWindow.propTypes = {
  startCall: PropTypes.func.isRequired,
};

export default StartCallWindow;
