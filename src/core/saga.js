import { all, call, put, takeEvery } from "redux-saga/effects";
import { AUTH_TYPE } from "./reducer/authReducer";
import { api } from "./service/api";
import { API_URL } from "./service/config";
import constants from "../constants/constants";
import { CHAT_TYPE } from "./reducer/chatReducer";
import { USER_TYPE } from "./reducer/userReducer";

export default function* rootSaga() {
  yield all([
    watchPostUserLogin(),
    watchPostConversation(),
    watchGetConversation(),
    watchInfoUser(),
    watchSearchUser(),
    watchUserRoom(),
    watchGetMessage(),
    watchPostUserLogout()
  ]);
}
function* postUserLogin(actions) {
  const response = yield call(api, {
    ...API_URL.postLogin,
    params: {
      ...actions.params,
    },
  });
  if (response.status == constants.API_STATUS.API_200) {
    yield put({
      type: AUTH_TYPE.LOGIN_SUCCESS,
      params: response.data,
    });
  }
}

export function* watchPostUserLogin() {
  yield takeEvery(AUTH_TYPE.LOGIN, postUserLogin);
}
function* postUserLogout(actions) {
  console.log(actions);
  const response = yield call(api, {
    ...API_URL.postLogout,
    params: {
      ...actions.params,
    },
  });
  console.log(response);
  
  if (response.status == constants.API_STATUS.API_200) {
    console.log("fasdf");
    
    yield put({
      type: AUTH_TYPE.LOGOUT_SUCCESS,
      params: response.data,
    });
  }
}

export function* watchPostUserLogout() {
  yield takeEvery(AUTH_TYPE.LOGOUT, postUserLogout);
}

//post conversation
function* postConversation(actions) {
  const response = yield call(api, {
    ...API_URL.postConversation,
    params: {
      ...actions.params,
    },
  });
  console.log(response);

  if (response.status == constants.API_STATUS.API_200) {
    yield put({
      type: CHAT_TYPE.POST_CONVERSATION_SUCCESS,
      params: response.data,
    });
  }
  if (actions.callBack) {
    actions.callBack(response);
  }
}
function* putConversation(actions) {
  const response = yield call(api, {
    ...API_URL.putConversation,
    params: {
      ...actions.params,
    },
  });
  if (response.status == constants.API_STATUS.API_200) {
    yield put({
      type: CHAT_TYPE.UPDATE_CONVERSATION_SUCCESS,
      params: response.data.data,
    });
  }
  if (actions.callBack) {
    actions.callBack(response);
  }
}
export function* watchPostConversation() {
  yield takeEvery(CHAT_TYPE.POST_CONVERSATION, postConversation);
  yield takeEvery(CHAT_TYPE.UPDATE_CONVERSATION, putConversation);
}

//get conversation
function* getConversation(actions) {
  const response = yield call(api, {
    ...API_URL.getConversations,
    params: {
      ...actions.params,
    },
  });
  console.log(response);

  if (response.status == constants.API_STATUS.API_200) {
    yield put({
      type: CHAT_TYPE.GET_CONVERSATION_SUCCESS,
      params: response.data.data,
    });
  }
}
function* getOneConversation(actions) {
  const response = yield call(api, {
    ...API_URL.getConversation,
    params: {
      ...actions.params,
    },
  });
  if (actions.callBack) {
    actions.callBack(response);
  }
}
export function* watchGetConversation() {
  yield takeEvery(CHAT_TYPE.GET_CONVERSATION, getConversation);
  yield takeEvery(CHAT_TYPE.GET_ONE_CONVERSATION, getOneConversation);
}

//get user info
function* getInfoUser(actions) {
  const response = yield call(api, {
    ...API_URL.getInfoUser,
    params: {
      ...actions.params,
    },
  });
  console.log(response);

  if (response.status == constants.API_STATUS.API_200) {
    yield put({
      type: USER_TYPE.GET_USER_SUCCESS,
      params: response.data.data,
    });
  }
}
function* updateInfoUser(actions) {
  const response = yield call(api, {
    ...API_URL.updateInfoUser,
    params: {
      ...actions.params,
    },
  });

  if (response.status == constants.API_STATUS.API_200) {
    yield put({
      type: USER_TYPE.UPDATE_USER_SUCCESS,
      params: response.data.data,
    });
  }
  if (actions.callBack) {
    actions.callBack(response);
  }
}
export function* watchInfoUser() {
  yield takeEvery(USER_TYPE.GET_USER, getInfoUser);
  yield takeEvery(USER_TYPE.UPDATE_USER, updateInfoUser);
}

//search user
function* searchUser(actions) {
  const response = yield call(api, {
    ...API_URL.searchUser,
    params: {
      ...actions.params,
    },
  });
  if (actions.callBack) {
    actions.callBack(response);
  }
}
export function* watchSearchUser() {
  yield takeEvery(USER_TYPE.SEARCH_USER, searchUser);
}

function* postUserRoom(actions) {
  const response = yield call(api, {
    ...API_URL.postMember,
    params: {
      ...actions.params,
    },
  });
  if (actions.callBack) {
    actions.callBack(response);
  }
}
function* getUserRoom(actions) {
  const response = yield call(api, {
    ...API_URL.getMember,
    params: {
      ...actions.params,
    },
  });

  if (actions.callBack) {
    actions.callBack(response);
  }
}
export function* watchUserRoom() {
  yield takeEvery(CHAT_TYPE.ADD_MEMBER, postUserRoom);
  yield takeEvery(CHAT_TYPE.GET_USER_ROOM, getUserRoom);
}

function* getMessage(actions) {
  const response = yield call(api, {
    ...API_URL.getMessage,
    params: {
      ...actions.params,
    },
  });

  if (actions.callBack) {
    actions.callBack(response);
  }
}
export function* watchGetMessage() {
  yield takeEvery(CHAT_TYPE.GET_MESSAGE, getMessage);
}
