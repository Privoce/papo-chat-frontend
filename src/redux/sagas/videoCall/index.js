import { takeLatest, takeEvery, put } from "redux-saga/effects";

import { sendRequest } from "modules/utils";

import {
	START_VIDEO,
	VIDEO_ACCEPTED,
	VIDEO_MISSED,
	VIDEO_CLOSED,
	ACCEPT_VIDEO_CALL
} from "redux/constants/videoCall";

import { toast } from "react-toastify";

import constants from "modules/constants";
import * as messageActions from "redux/actions/videoCall";
import * as conversationActions from "redux/actions/conversation";

function* aceptVideoCall(action) {
	const { body } = action.params;

	try {
		const response = yield sendRequest({
			url: `${constants.API.ROOT}/secured/videoCall-acept`,
			method: constants.API.METHODS.POST,
			body
		});

		yield put(conversationActions.videoCallAcepted());
	} catch (e) {
		toast.error(constants.LABELS.MAIN.GLOBAL_ERROR);
	}
}

const sagas = [takeLatest(ACCEPT_VIDEO_CALL, aceptVideoCall)];

export default sagas;
