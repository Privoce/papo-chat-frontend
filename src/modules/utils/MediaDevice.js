import _ from 'lodash';

import Emitter from './Emitter';

/**
 * Manage all media devices
 */
class MediaDevice extends Emitter {
  /**
   * Start media devices and send stream
   */
  start() {
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      const cams = devices.filter((device) => device.kind === 'videoinput');

      const constraints = {
        video:
          cams.length > 0
            ? {
                facingMode: 'user',
                height: { min: 360, ideal: 720, max: 1080 },
              }
            : false,
        audio: true,
      };

      navigator.mediaDevices
        .getUserMedia(constraints)
        .then((stream) => {
          this.stream = stream;
          this.emit('stream', stream);
        })
        .catch((err) => {
          if (err instanceof DOMException) {
            // TODO: put alert box here
            alert('Cannot open webcam and/or microphone');
          } else {
            console.log(err);
          }
        });
    });

    return this;
  }

  /**
   * Turn on/off a device
   * @param {String} type - Type of the device
   * @param {Boolean} [on] - State of the device
   */
  toggle(type, on) {
    const len = arguments.length;
    if (this.stream) {
      this.stream[`get${type}Tracks`]().forEach((track) => {
        const state = len === 2 ? on : !track.enabled;
        _.set(track, 'enabled', state);
      });
    }
    return this;
  }

  /**
   * Stop all media track of devices
   */
  stop() {
    if (this.stream) {
      this.stream.getTracks().forEach((track) => track.stop());
    }
    return this;
  }
}

export default MediaDevice;
