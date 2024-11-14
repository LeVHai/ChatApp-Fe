import { AUTH_TYPE } from "../reducer/authReducer"

export const postUserLogin = (params, callBack) => {
    return {
        type:AUTH_TYPE.LOGIN,
        params,
        callBack
    }
}
export const postUserRegister = (params, callBack) => {
    return {
        type:AUTH_TYPE.REGISTER,
        params,
        callBack
    }
}
export const postUserForgotPassword = (params, callBack) => {
    return {
        type:AUTH_TYPE.LOGIN_SUCCESS,
        params,
        callBack
    }
}
export const postUserLogout = (params, callBack) => {
    return {
        type:AUTH_TYPE.LOGOUT,
        params,
    }
}
