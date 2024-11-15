import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setThemeAction } from "../core/reducer/themeReducer";
import { darkTheme, lightTheme } from "../theme/theme";

export const useTheme = () => {
  const { theme } = useSelector((state) => state.themeReducer);

  const selectedTheme = theme === "light" ? lightTheme : darkTheme;
  const dispatch = useDispatch();
  const setTheme = (theme) => {
    dispatch(setThemeAction(theme));
  };
  return { theme, selectedTheme, setTheme };
};
