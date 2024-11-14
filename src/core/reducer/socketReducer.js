export const SOCKET_TYPE = {
   SET_SOCKET:"SET_SOCKET"
  };
  
  const initialState = {
    socket:null,
    status:100
  };
  
  const socketReducer = (state = initialState, action) => {
    switch (action.type) {
      case SOCKET_TYPE.SET_SOCKET:
        return {...state,socket : action.params}
      default:
        return state;
    }
  };
  
  export default socketReducer;
  