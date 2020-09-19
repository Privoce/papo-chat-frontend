import { VIDEO_CALL_CALLING } from 'redux/constants/conversation';
import { RESET } from 'redux/constants/main';
import {
  START_VIDEO,
  VIDEO_ACCEPTED,
  VIDEO_MISSED,
  VIDEO_CLOSED,
  VIDEO_CALLING,
} from 'redux/constants/videoCall';

const initialState = {
  calling: false,
  initiateCall: false,
  user: {},
  socket: null,
};

export default function messageReducer(state = initialState, action) {
  switch (action.type) {
    case START_VIDEO:
      return { ...state, initiateCall: true };

    case VIDEO_CALL_CALLING:
      return { ...state, calling: true, user: action.params };

    case VIDEO_ACCEPTED:
      return { ...state, calling: false, ...action.params };

    case 'EXPORT_SOCKET':
      return { ...state, socket: action.socket };

    case VIDEO_MISSED:
      return { ...state, calling: false };

    case VIDEO_CLOSED:
      return { ...state, calling: false };

    case RESET:
      return initialState;

    default:
      return state;
  }
}
