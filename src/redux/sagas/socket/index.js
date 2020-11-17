import { Howl } from 'howler';
import { toast } from 'react-toastify';
import { eventChannel } from 'redux-saga';
import { put, call, fork, take, cancel, takeLatest } from 'redux-saga/effects';
import io from 'socket.io-client';

import constants from 'modules/constants';
import { getToken, logout } from 'modules/utils';
import * as conversationActions from 'redux/actions/conversation';
import * as socketActions from 'redux/actions/socket';
import * as videoCallActions from 'redux/actions/videoCall';
import { START_CHANNEL, STOP_CHANNEL } from 'redux/constants/socket';

let socket;
let socketTask;

function connectSocket() {
  const socket = io(process.env.REACT_APP_URL);
  return new Promise((resolve) => {
    socket.on('connect', () => {
      resolve(socket);
    });
  });
}

function subscribe(socket) {
  return eventChannel((emit) => {
    socket.on('message.new', (response) => {
      const {
        addMessageToCurrentConversationMessages,
        incrementConversationUnreadMessages,
      } = conversationActions;

      const sound = new Howl({
        src: [
          `${process.env.PUBLIC_URL}${constants.GLOBAL.MESSAGE_RECEIVED_MP3}`,
        ],
      });

      sound.play();

      const { message, sender } = response;

      emit(
        addMessageToCurrentConversationMessages({
          message,
          partner: sender,
        })
      );
      emit(
        incrementConversationUnreadMessages({
          partner: sender,
        })
      );
    });

    socket.on('videocall.calling', (response) => {
      const { videoCallCalling } = conversationActions;
      emit(videoCallCalling(response.from));
    });

    socket.on('disconnect', () => {
      emit(socketActions.startChannel());
    });

    socket.on('login-error', () => {
      logout();
    });

    return () => {};
  });
}

function* login(socket) {
  const token = getToken();
  yield socket.emit('login', {
    token,
  });
}

function* read(socket) {
  const channel = yield call(subscribe, socket);
  const { exportSocket } = conversationActions;

  yield put(exportSocket(socket));

  while (true) {
    const action = yield take(channel);
    yield put(action);
  }
}

function* handleIO(socket) {
  yield fork(login, socket);
  yield fork(read, socket);
}

function* startChanelSaga() {
  try {
    yield put(socketActions.stopChannel());
    socket = yield call(connectSocket);
    yield put(socketActions.serverOn());
    socketTask = yield fork(handleIO, socket);
  } catch (e) {
    console.log(e);
    toast.error(constants.LABELS.MAIN.GLOBAL_ERROR);
  }
}

function* stopChanelSaga() {
  if (socket) {
    socket.off();
    socket.disconnect();
  }

  yield cancel(socketTask);
  yield put(socketActions.serverOff());
}

const sagas = [
  takeLatest(START_CHANNEL, startChanelSaga),
  takeLatest(STOP_CHANNEL, stopChanelSaga),
];

export default sagas;
