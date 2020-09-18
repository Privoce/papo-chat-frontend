import io from 'socket.io-client';

import constants from 'modules/constants';

import Emitter from './Emitter';
import MediaDevice from './MediaDevice';

const PC_CONFIG = { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] };

class PeerConnection extends Emitter {
  /**
   * Create a PeerConnection.
   * @param {String} friendID - ID of the friend you want to call.
   */
  constructor(friendID) {
    super();
    this.pc = new RTCPeerConnection(PC_CONFIG);
    this.socket = io(constants.API.ROOT);
    this.pc.onicecandidate = (event) => {
      this.socket.emit('call', {
        to: this.friendID,
        candidate: event.candidate,
      });
    };
    this.pc.ontrack = (event) => {
      this.emit('peerStream', event.streams[0]);
    };

    this.mediaDevice = new MediaDevice();
    this.friendID = friendID;
  }

  /**
   * Starting the call
   * @param {Boolean} isCaller
   * @param {Object} config - configuration for the call {audio: boolean, video: boolean}
   */
  start(isCaller, config, myId) {
    this.mediaDevice
      .on('stream', (stream) => {
        stream.getTracks().forEach((track) => {
          this.pc.addTrack(track, stream);
        });

        this.emit('localStream', stream);
        if (isCaller) {
          this.socket.emit('request', {
            to: this.friendID,
            from: myId,
          });
        } else this.createOffer();
      })
      .start(config);

    return this;
  }

  /**
   * Stop the call
   * @param {Boolean} isStarter
   */
  stop(isStarter) {
    if (isStarter) {
      this.socket.emit('end', { to: this.friendID });
    }
    this.mediaDevice.stop();
    this.pc.close();
    this.pc = null;
    this.off();
    return this;
  }

  createOffer() {
    this.pc
      .createOffer()
      .then(this.getDescription.bind(this))
      .catch((err) => console.log(err));
    return this;
  }

  createAnswer() {
    this.pc
      .createAnswer()
      .then(this.getDescription.bind(this))
      .catch((err) => console.log(err));
    return this;
  }

  getDescription(desc) {
    this.pc.setLocalDescription(desc);
    this.socket.emit('call', { to: this.friendID, sdp: desc });
    return this;
  }

  /**
   * @param {Object} sdp - Session description
   */
  setRemoteDescription(sdp) {
    const rtcSdp = new RTCSessionDescription(sdp);
    this.pc.setRemoteDescription(rtcSdp);
    return this;
  }

  /**
   * @param {Object} candidate - ICE Candidate
   */
  addIceCandidate(candidate) {
    if (candidate) {
      const iceCandidate = new RTCIceCandidate(candidate);
      this.pc
        .addIceCandidate(iceCandidate)
        .catch((error) => console.log('error', error));
    }
    return this;
  }
}

export default PeerConnection;
