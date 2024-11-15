import React from "react";
import {
  Avatar,
  Button,
  ConfigProvider,
  Flex,
  Layout,
  Menu,
  Switch,
} from "antd";
import {
  HomeOutlined,
  LogoutOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import Chat from "../../page/Chat/Chat";
import { useTheme } from "../../hooks/useTheme";
import { Outlet } from "react-router-dom";
const { Sider, Content } = Layout;
import "./styles.scss";
const MainLayout = () => {
  const { theme, setTheme } = useTheme();

const changeTheme = (check)=>{
console.log(check);
setTheme(check === true ? "dark" : "light")
}

  return (
    <Layout style={{ height: "100vh" }}>
      <Sider width={60} collapsedWidth={0} breakpoint="md">
        <div className="sider">
          <Flex vertical align="center">
            <div className="sider-header">
              <Flex style={{ padding: "10px" }} justify="center">
                <Avatar size="large" />
              </Flex>
              <Menu
                items={[
                  { label: <MessageOutlined /> },
                  { label: <HomeOutlined /> },
                  { label: <HomeOutlined /> },
                ]}
              />
            </div>
            {/* <Button icon={<LogoutOutlined />}>Log</Button> */}
          </Flex>
          <Button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          ></Button>
          <div className="sider-footer">
            <Flex vertical gap={10}>
              <Switch size="small" defaultChecked={theme === "light" ? false : true} onChange={changeTheme} />
              <Button icon={<LogoutOutlined />}></Button>
            </Flex>
          </div>
        </div>
      </Sider>
      <Content>
        <Outlet />
      </Content>
    </Layout>
  );
};

export default MainLayout;
