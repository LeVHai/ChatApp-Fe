import { Button, Carousel, Col, Flex, Input, Row, Typography } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "../../hooks/useTheme";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { getConversation, setStateChat, updateConversation, updateConversationSuccess } from "../../core/action/chatAction";
import ConversationItem from "../../components/ConversationItem/ConversationItem";
import { Outlet, useLocation } from "react-router-dom";
import CreateConversation from "../../components/CreateConversation";
import { cloneDeep } from "lodash";

const Chat = () => {
  const { socket } = useSelector((state) => state.socketReducer);

  const { conversations } = useSelector((state) => state.chatReducer);
  const { theme, selectedTheme } = useTheme();
  const conversationRef = useRef();
  const lazyConversation = useRef({ page: 1, limit: 10, totalPage: 0 });
  const location = useLocation();

  const [activeId, setActiveId] = useState(null);

  const handleSetActiveId = (id) => {
    setActiveId(id);
  };

  const isChatSelected = location.pathname.includes("/chat/");

  const dispatch = useDispatch();

  useEffect(() => {
    loadConversation();
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("conversation updated", (data) => {
        console.log("Conversation updated:", data);
        console.log(data);
        
        if (data && data?.status === 200) {
          dispatch(updateConversationSuccess(data.conversation));
        } 
      });
    }
  }, [socket]);
  const loadConversation = () => {
    dispatch(getConversation());
  };

  const createConversation = () => {
    conversationRef.current.create();
  };

  const contentStyle = {
    margin: 0,
    height: "100vh",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
  return (
    <>
      <Row>
        <Col span={5}>
          <div
            className="conversation"
            style={{ backgroundColor: selectedTheme.secondary }}
          >
            <Flex
              className="conversation-header"
              justify="space-between"
              align="center"
            >
              <div
                className="title"
                style={{ color: selectedTheme.textPrimary }}
              >
                Chat app
              </div>
              <Button
                onClick={createConversation}
                icon={<PlusOutlined />}
              ></Button>
            </Flex>

            <div className="input-search">
              <Input prefix={<SearchOutlined />} />
            </div>
            <div className="conversation-list">
              {conversations.length === 0 ? (
                <div>Bạn chưa có cuộc hội thoại nào</div>
              ) : (
                conversations.map((conversation) => (
                  <ConversationItem
                    key={conversation._id}
                    {...conversation}
                    activeId={activeId}
                    isActive={conversation._id === activeId}
                    setActiveId={handleSetActiveId}
                  />
                ))
              )}
            </div>
          </div>
        </Col>
        <Col span={19}>
          {isChatSelected ? (
            <Outlet />
          ) : (
            <Carousel autoplay>
              <div>
                <div style={contentStyle}>
                  <div>
                    <img height={300} src="/undraw_spread_love_re_v3cl.svg" />
                    <Flex vertical>
                      <Typography.Text>
                        Chào mừng đến với Chat App
                      </Typography.Text>
                      <Typography.Text>
                        Hãy chọn một cuộc hội thoại để bắt đầu trò chuyện!
                      </Typography.Text>
                    </Flex>
                  </div>
                </div>
              </div>
              <div>
                <div style={contentStyle}>
                  <div>
                    <img height={300} src="/undraw_couple_love_re_3fw6.svg" />
                    <Flex vertical>
                      <Typography.Text>
                        Trò chuyện trưc tuyến kết bạn thả ga !
                      </Typography.Text>
                      <Typography.Text>Kết nối mọi yêu thương!</Typography.Text>
                    </Flex>
                  </div>
                </div>
              </div>
            </Carousel>
          )}
        </Col>
      </Row>
      <CreateConversation ref={conversationRef} />
    </>
  );
};

export default Chat;
