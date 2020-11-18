import React, { useState, useEffect, useRef } from 'react';

import classnames from 'classnames';
import { useSelector } from 'react-redux';
import { Rnd } from 'react-rnd';

import noImage from 'assets/images/no-picture.png';

import './styles.scss';

const getButtonClass = (icon, enabled) =>
  classnames(`btn-action fa ${icon}`, { disable: !enabled });

function CallWindow({
  peerSrc,
  localSrc,
  config,
  mediaDevice,
  status,
  endCall,
}) {
  const peerVideo = useRef(null);
  const localVideo = useRef(null);
  const [video, setVideo] = useState(config.video);
  const [audio, setAudio] = useState(config.audio);
  const [clientVideo, setClientVideo] = useState(false);

  const videoCallData = useSelector((state) => state.videoCall);

  useEffect(() => {
    if (peerVideo.current && peerSrc) {
      peerVideo.current.srcObject = peerSrc;
    }

    if (localVideo.current && localSrc) {
      localVideo.current.srcObject = localSrc;
    }

    videoCallData.socket.on('toggle-video', (data) => {
      if (data.status) {
        setClientVideo(true);
      } else {
        setClientVideo(false);
      }
    });
  });

  useEffect(() => {
    if (mediaDevice) {
      mediaDevice.toggle('Video', video);
      mediaDevice.toggle('Audio', audio);
    }
  });

  /**
   * Turn on/off a media device
   * @param {String} deviceType - Type of the device eg: Video, Audio
   */
  const toggleMediaDevice = (deviceType) => {
    if (deviceType === 'video') {
      setVideo(!video);
      mediaDevice.toggle('Video');
    }
    if (deviceType === 'audio') {
      setAudio(!audio);
      mediaDevice.toggle('Audio');
    }
  };

  return (
    <div className={classnames('call-window', status)}>
      <Rnd
        className={clientVideo ? '' : 'hidden'}
        default={{
          x: window.innerWidth / 6,
          y: 50,
          width: '70%',
          height: '90%',
        }}
      >
        <video id="peerVideo" ref={peerVideo} autoPlay />
      </Rnd>

      <div className={`user-call-image ${clientVideo ? 'hidden' : ''}`}>
        <img src={noImage} alt="User" />
      </div>

      {video && (
        <Rnd
          default={{
            x: window.innerWidth - 400,
            y: window.innerHeight - 200,
            width: '20%',
            height: '20%',
          }}
        >
          <video id="localVideo" ref={localVideo} autoPlay muted />
        </Rnd>
      )}

      <div className="video-control">
        <button
          id="btnVideo"
          name="btnVideo"
          key="btnVideo"
          type="button"
          className={getButtonClass('fa-video-camera', video)}
          onClick={() => toggleMediaDevice('video')}
        />
        <button
          key="btnAudio"
          type="button"
          className={getButtonClass('fa-microphone', audio)}
          onClick={() => toggleMediaDevice('audio')}
        />
        <button
          type="button"
          className="btn-action hangup fa fa-phone"
          onClick={() => endCall(true)}
        />
      </div>
    </div>
  );
}

export default CallWindow;
