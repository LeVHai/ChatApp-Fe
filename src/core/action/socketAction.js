import { SOCKET_TYPE } from "../reducer/socketReducer"

export const setSocket = (params) => {
    return {
        type:SOCKET_TYPE.SET_SOCKET,
        params,
    }
}