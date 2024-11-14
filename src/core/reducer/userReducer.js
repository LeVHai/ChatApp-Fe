export const USER_TYPE = {
  GET_USER: "GET_USER",
  UPDATE_USER:"UPDATE_USER",
  UPDATE_USER_SUCCESS:"UPDATE_USER_SUCCESS",
  GET_USER_SUCCESS: "GET_USER_SUCCESS",
  SEARCH_USER:"SEARCH_USER",
  GET_USER_ROOM:"GET_USER_ROOM",
};

const initialState = {
  user: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_TYPE.GET_USER_SUCCESS:
      return {
        ...state,
        user: action.params,
      };
    case USER_TYPE.UPDATE_USER_SUCCESS:
      return {
        ...state,
        user: action.params,
      };

    default:
      return state;
  }
};

export default userReducer;
