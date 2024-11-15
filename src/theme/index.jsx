import { ConfigProvider } from "antd";
import React from "react";
import { useTheme } from "../hooks/useTheme";

export const ThemeProvider = ({ children }) => {
  const { selectedTheme } = useTheme();
  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            colorBgContainer: selectedTheme.button,
            colorText: selectedTheme.textPrimary,
          },
          Input: {
            colorBgContainer: selectedTheme.secondary,
            colorText: selectedTheme.textPrimary,
          },
          Menu: {
            colorBgContainer: selectedTheme.primary,
            colorText: selectedTheme.textPrimary,
          },
          Typography: {
            colorText: selectedTheme.textPrimary,
          },
          Layout: {
            siderBg: selectedTheme.primary,
          },
          Modal: {
            colorBgContainer: selectedTheme.primary,
            colorBgLayout: selectedTheme.primary,
          },
        },
        token: {
          colorBgLayout: selectedTheme.primary,
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};
