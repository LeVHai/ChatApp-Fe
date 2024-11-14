
const THEME_TYPE = {
  SET_THEME: "SET_THEME",
};

const initialState = {
  theme:  'light' 
};

const themeReducer = (state = initialState, action) => {
  switch (action.type) {
    case THEME_TYPE.SET_THEME:
      return {
        ...state,
        theme: action.payload,
      };
    default:
      return state;
  }
};

export const setThemeAction = (theme) => ({
  type: THEME_TYPE.SET_THEME,
  payload: theme,
});

export default themeReducer;
