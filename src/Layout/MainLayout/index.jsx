import React from "react";
import { Avatar, Button, ConfigProvider, Flex, Layout, Menu } from "antd";
import { HomeOutlined, LogoutOutlined, MessageOutlined } from "@ant-design/icons";
import Chat from "../../page/Chat/Chat";
import { useTheme } from "../../hooks/useTheme";
import { Outlet } from "react-router-dom";
const { Sider, Content } = Layout;

const MainLayout = () => {
  const { theme, setTheme } = useTheme();
  return (
   
      <Layout style={{ height: "100vh" }}>
        <Sider
          width={80} 
          collapsedWidth={0}
          breakpoint="md" 
      >
          <Flex vertical align="">
         <div>
         <Flex style={{padding:"10px"}} justify="center">
          <Avatar size="large"/>
          </Flex>
          <Menu
            items={[
              { label: <MessageOutlined /> },
              { label: <HomeOutlined /> },
              { label: <HomeOutlined /> },
            ]}
          />s
         </div>
            <Button icon={<LogoutOutlined/>}>Log</Button>
          </Flex>
          <Button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            faddsf
          </Button>
        </Sider>
        <Content
        >
          <Outlet/>
        </Content>
      </Layout>
  );
};

export default MainLayout;
