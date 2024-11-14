export const AUTH_TYPE = {
    LOGIN:"LOGIN",
    LOGIN_SUCCESS:"LOGIN_SUCCESS",
    LOGOUT:"LOGOUT",
    LOGOUT_SUCCESS:"LOGOUT_SUCCESS",
    REGISTER:"REGISTER",
    FORGOT_PASSWORD:"FORGOT_PASSWORD",
    UPDATE_TOKEN:"UPDATE_TOKEN"
}

const initialState = {
    token: null,
    refreshToken: null,
    isLoggedIn:false
};

const authReducer = (state = initialState, action)  => {
    switch (action.type) {
        case AUTH_TYPE.LOGIN_SUCCESS:
            return {
                ...state,
                token: action.params.data.access_token,
                refreshToken: action.params.data.refresh_token,
                isLoggedIn:true
            };
        case AUTH_TYPE.LOGOUT_SUCCESS:
            return {
                ...state,
                token: null,
                refreshToken: null,
                isLoggedIn:false

            };
        case AUTH_TYPE.UPDATE_TOKEN:
            return {
                ...state,
                token: action.payload.access_token,
                refreshToken: action.payload.refresh_token,
            };
        default:
            return state;
    }
};

export default authReducer;
