import { USER_TYPE } from "../reducer/userReducer"

export const getInfoUser = (params, callBack) => {
    return {
        type:USER_TYPE.GET_USER,
        params,
        callBack
    }
}
export const updateInfoUser = (params, callBack) => {
    console.log(params);
    
    return {
        type:USER_TYPE.UPDATE_USER,
        params,
        callBack
    }
}
//Search user
export const searchUser = (params, callBack) => {
    return {
        type:USER_TYPE.SEARCH_USER,
        params,
        callBack
    }
}
