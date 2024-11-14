import { cloneDeep } from "lodash";

export const CHAT_TYPE = {
  GET_USER_ONLINE: "GET_USER_ONLINE",
  POST_CONVERSATION: "POST_CONVERSATION",
  GET_CONVERSATION: "GET_CONVERSATION",
  GET_ONE_CONVERSATION: "GET_ONE_CONVERSATION",
  POST_CONVERSATION: "POST_CONVERSATION",
  POST_CONVERSATION_SUCCESS: "POST_CONVERSATION_SUCCESS",
  GET_CONVERSATION: "GET_CONVERSATION",
  GET_CONVERSATION_SUCCESS: "GET_CONVERSATION_SUCCESS",
  ADD_MEMBER: "ADD_MEMBER",
  UPDATE_CONVERSATION: "UPDATE_CONVERSATION",
  UPDATE_CONVERSATION_SUCCESS: "UPDATE_CONVERSATION_SUCCESS",
  GET_MESSAGE: "GET_MESSAGE",
  GET_USER_ROOM: "GET_USER_ROOM",
};

const initialState = {
  conversations: [],
  getOnlineUser: [],
};

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHAT_TYPE.GET_USER_ONLINE:
      return {
        ...state,
        getOnlineUser: action.params,
      };
    case CHAT_TYPE.POST_CONVERSATION_SUCCESS:
      return {
        ...state,
        conversations: [
          action.params.data.conversation,
          ...state.conversations,
        ],
      };
    case CHAT_TYPE.GET_CONVERSATION_SUCCESS:
      return {
        ...state,
        conversations: state.conversations.concat(action.params),
      };
      case CHAT_TYPE.UPDATE_CONVERSATION_SUCCESS:
        console.log("action.params", action.params);
  
        const index = state.conversations.findIndex(
          (conversation) => conversation._id === action.params._id
        );
        console.log(index);
  
        if (index !== -1) {
          const updatedConversations = cloneDeep(state.conversations)
          updatedConversations[index] = {
            ...updatedConversations[index],
            ...action.params, 
          };
  
          return {
            ...state,
            conversations: updatedConversations,
          };
        }
  
        return state; // Trả về state hiện tại nếu không tìm thấy cuộc hội thoại
    default:
      return state;
  }
};

export default chatReducer;
