/* eslint-disable react/sort-comp */
/* eslint-disable no-alert */
import React, { Component } from 'react';
import _, { isEmpty } from 'lodash';
import { MdCall, MdCallEnd } from 'react-icons/md';

import { ActionsWrapper, ChatWrapper } from 'entries/chat/wrappers';
import { CallWindowComponent } from 'shared/components';

import PeerConnection from 'modules/utils/PeerConnection';

import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';

import { getUser } from 'modules/utils';

import * as socketActions from 'redux/actions/socket';
import * as videoCallActions from 'redux/actions/videoCall';
import { instanceOf, string } from 'prop-types';
import profilePlaceholder from '../../assets/images/no-picture.png';

class HomeEntry extends Component {
  constructor() {
    super();
    this.state = {
      clientId: '',
      clientName: '',
      callWindow: '',
      callModal: '',
      callFrom: '',
      localSrc: null,
      peerSrc: null,
      started: false
    };
    this.pc = {};
    this.config = null;
    this.startCallHandler = this.startCall.bind(this);
  }

  componentDidMount() {
    const { socketActions } = this.props;

    socketActions.startChannel();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { videoCallData } = this.props;

    console.log(videoCallData.user, 'updated');

    if (!this.state.started && videoCallData.socket) {
      videoCallData.socket.on('call', data => {
        if (data.sdp) {
          this.pc.setRemoteDescription(data.sdp);
          if (data.sdp.type === 'offer') this.pc.createAnswer();
        } else {
          this.pc.addIceCandidate(data.candidate);
        }
      });

      this.setState({
        started: true
      });
    }
  }

  startCall(isCaller, friendID, config) {
    this.config = config;
    this.pc = new PeerConnection(friendID)
      .on('localStream', src => {
        const newState = { callWindow: 'active', localSrc: src };
        if (!isCaller) newState.callModal = '';
        this.setState(newState);
      })
      .on('peerStream', src => {
        this.setState({ peerSrc: src });
      })
      .start(isCaller, config, getUser());
  }

  handleCallStart = () => {
    const { conversationData } = this.props;
    const { currentPartnerIdConversation } = conversationData;
    const config = { audio: true, video: true };
    this.startCall(true, currentPartnerIdConversation, config);
  };

  handleAceptCall = () => {
    const { conversationData } = this.props;
    const { videoCallData } = this.props;
    const { currentPartnerIdConversation } = conversationData;
    const config = { audio: true, video: true };

    this.startCall(false, videoCallData.user._id, config);
    const { videoCallActions } = this.props;

    videoCallActions.acceptedVideoCall();
  };

  handleCancelCall = () => {};

  render() {
    const { videoCallData } = this.props;
    const { calling, user } = videoCallData;
    const { localSrc, peerSrc } = this.state;

    return (
      <>
        {calling && (
          <div className="call-container">
            <img src={profilePlaceholder} alt="User profile picture" />
            <h2>{user.nickname}</h2>
            <p>Is calling...</p>
            <div className="button-container">
              <button onClick={this.handleAceptCall}>
                <MdCall />
              </button>
              <button onClick={this.handleCancelCall}>
                <MdCallEnd />
              </button>
            </div>
          </div>
        )}
        <div className={calling && 'blur-cover'} />
        <div className={`chat-wrapper ${calling && 'call-blur'}`}>
          <ActionsWrapper />
          <ChatWrapper startCall={this.handleCallStart} />
        </div>
        {!_.isEmpty(this.config) && (
          <CallWindowComponent
            status="calling"
            localSrc={localSrc}
            peerSrc={peerSrc}
            config={this.config}
            mediaDevice={this.pc.mediaDevice}
            endCall={this.endCallHandler}
          />
        )}
      </>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    socketActions: bindActionCreators(socketActions, dispatch),
    videoCallActions: bindActionCreators(videoCallActions, dispatch)
  };
};

const mapStateToProps = state => {
  return {
    videoCallData: state.videoCall,
    conversationData: state.conversation
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeEntry);
