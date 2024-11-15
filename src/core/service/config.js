export default {
  BASE_API_URL: "http://localhost:3000",
};

export const API_METHOD = {
  GET: "get",
  POST: "post",
  PUT: "put",
  DELETE: "delete",
};

export const API_URL = {
  postRegister: {
    url: "/user/register",
    method: API_METHOD.POST,
    body: true,
  },
  postLogin: {
    url: "/user/login",
    method: API_METHOD.POST,
    body: true,
  },
  postLogout: {
    url: "/user/logout",
    method: API_METHOD.POST,
    body: true,
  },
  postForgotPassword: {
    url: "/user/forgot-password",
    method: API_METHOD.POST,
    body: true,
  },
  postRefreshToken: {
    url: "/user/refresh-token",
    method: API_METHOD.POST,
    body: true,
  },
  postConversation: {
    url: "/chat/conversation",
    method: API_METHOD.POST,
    body: true,
  },
  putConversation: {
    url: "/chat/conversation",
    method: API_METHOD.PUT,
    body: true,
  },
  getConversations: {
    url: "/chat/conversations",
    method: API_METHOD.GET,
    body: false,
  },
  getConversation: {
    url: "/chat/conversation",
    method: API_METHOD.GET,
    body: false,
  },
  postMember: {
    url: "/chat/member",
    method: API_METHOD.POST,
    body: true,
  },
  getMember: {
    url: "/chat/member",
    method: API_METHOD.GET,
    body: false,
  },
  getInfoUser: {
    url: "/user/info",
    method: API_METHOD.GET,
    body: false,
  },
  updateInfoUser: {
    url: "/user/info",
    method: API_METHOD.PUT,
    body: true,
  },
  searchUser: {
    url: "/user/search-user",
    method: API_METHOD.GET,
    body: false,
  },
  getMessage: {
    url: "/chat/message",
    method: API_METHOD.GET,
    body: false,
  },
  getUserRoom: {
    url: "/chat/member",
    method: API_METHOD.GET,
    body: false,
  },
};
