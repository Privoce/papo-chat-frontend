import {
	START_VIDEO,
	VIDEO_ACCEPTED,
	VIDEO_MISSED,
	VIDEO_CLOSED,
	VIDEO_CALLING,
	ACCEPT_VIDEO_CALL
} from "redux/constants/videoCall";

export function startVideoCall(params) {
	return {
		type: START_VIDEO,
		params
	};
}

export function acceptVideoCall(params) {
	return {
		type: ACCEPT_VIDEO_CALL,
		params
	};
}

export function acceptedVideoCall(params) {
	return {
		type: VIDEO_ACCEPTED,
		params
	};
}

export function missedVideoCall() {
	return {
		type: VIDEO_MISSED
	};
}

export function closedVideoCall(params) {
	return {
		type: VIDEO_CLOSED,
		params
	};
}
