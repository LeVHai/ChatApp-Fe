import { CHAT_TYPE } from "../reducer/chatReducer"
//Get user online
export const getOnlineUser = (params)=>{
    return {
        type:CHAT_TYPE.GET_USER_ONLINE,
        params,
    }
}
//Add group chat
export const postConversation = (params, callBack) => {
    return {
        type:CHAT_TYPE.POST_CONVERSATION,
        params,
        callBack
    }
}
//Get group chat
export const getConversation = (params, callBack) => {
    return {
        type:CHAT_TYPE.GET_CONVERSATION,
        params,
        callBack
    }
}
//Get 1 group chat
export const getOneConversation = (params, callBack) => {
    return {
        type:CHAT_TYPE.GET_ONE_CONVERSATION,
        params,
        callBack
    }
}
//Update conversation
export const updateConversation = (params, callBack) => {
    return {
        type:CHAT_TYPE.UPDATE_CONVERSATION,
        params,
        callBack
        
    }
}
//Add member
export const postAddMember = (params, callBack) => {
    return {
        type:CHAT_TYPE.ADD_MEMBER,
        params,
        callBack
    }
}
// Get message
export const getMessage = (params, callBack) => {
    return {
        type:CHAT_TYPE.GET_MESSAGE,
        params,
        callBack

    }
}
//Get list user in room
export const getUserRoom = (params, callBack) => {
    return {
        type:CHAT_TYPE.GET_USER_ROOM,
        params,
        callBack
    }
}
export const setStateChat = (params)=>{
    return {
        type:CHAT_TYPE.SET_STATE_CHAT,
        params,
    }
}
export const updateConversationSuccess = (params)=>{
    return {
        type:CHAT_TYPE.UPDATE_CONVERSATION_SUCCESS,
        params,
    }
}