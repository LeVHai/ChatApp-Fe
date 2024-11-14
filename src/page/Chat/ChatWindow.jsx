import {
  Avatar,
  Button,
  ConfigProvider,
  Flex,
  Input,
  Layout,
  Popover,
  Space,
  Typography,
} from "antd";
import React, {
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useTheme } from "../../hooks/useTheme";
import {
  FrownOutlined,
  LoadingOutlined,
  MoreOutlined,
  SendOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import Picker from "emoji-picker-react";
import "./styles.scss";
import Message from "../../components/Message";
import { useDispatch, useSelector } from "react-redux";
import { getMessage, getOneConversation } from "../../core/action/chatAction";
import { useParams } from "react-router-dom";
import { isSuccess } from "../../utils";
import { UserSelect } from "../../components/UserSelect";
import AddMember from "../../components/AddMember";
import InfiniteScroll from "react-infinite-scroll-component";
import EmojiPicker from "emoji-picker-react";
const ChatWindow = () => {
  const { socket } = useSelector((state) => state.socketReducer);
  const { user } = useSelector((state) => state.userReducer);
  const { selectedTheme } = useTheme();

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [conversation, setConversation] = useState(null);
  const [loadingMess, setLoadingMess] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [isPickerVisible, setPickerVisible] = useState(false);
  const lazyLoad = useRef({ page: 1, limit: 15 });
  const addMemberRef = useRef();
  const chatContentRef = useRef(null);
  const dispatch = useDispatch();
  const { id } = useParams();

  const loadConversation = useCallback(() => {
    dispatch(
      getOneConversation({ _id: id }, (res) => {
        if (isSuccess(res)) setConversation(res.data.data);
      })
    );
  }, [dispatch, id]);

  const loadMessage = useCallback(() => {
    setLoadingMess(true);
    dispatch(
      getMessage(
        {
          page: lazyLoad.current.page,
          limit: lazyLoad.current.limit,
          conversation_id: id,
        },
        (res) => {
          const newMessages = res.data.data;
          setMessages((prev) => [...prev, ...newMessages]);
          setLoadingMess(false);
          setHasMore(newMessages.length >= lazyLoad.current.limit);
        }
      )
    );
  }, [dispatch, id]);

  useEffect(() => {
    setMessages([]);
    lazyLoad.current.page = 1;
    setHasMore(true);
    loadConversation();
    loadMessage();
  }, [id, loadConversation, loadMessage]);

  useEffect(() => {
    if (socket) {
      socket.on("new message", (data) => {
        setMessages((prev) => [data, ...prev]);
      });
      return () => socket.off("new message");
    }
  }, [socket]);

  const fetchData = useCallback(() => {
    if (!loadingMess && hasMore) {
      lazyLoad.current.page += 1;
      loadMessage();
    }
  }, [loadingMess, hasMore, loadMessage]);

  const onEmojiClick = (emojiObject) =>
    setMessage((prev) => prev + emojiObject.emoji);
  const applyChange = (e) => setMessage(e.target.value);

  const sendMessage = () => {
    if (!message.trim()) return;
    socket.emit("send message", {
      user_id: user._id,
      conversation_id: conversation._id,
      content: message,
    });
    setMessage("");
  };

  useEffect(() => {
    if (chatContentRef.current) {
      chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <ConfigProvider
      theme={{
        components: {
          Layout: {
            headerBg: selectedTheme.primary,
            headerPadding: 10,
            colorBgLayout: selectedTheme.primary,
            footerBg: selectedTheme.primary,
            footerPadding: 10,
          },
        },
      }}
    >
      <Layout className="chat-window">
        <Layout.Header className="header">
          <Flex align="center" justify="space-between">
            <Flex gap="small">
              <Avatar src={conversation?.avatar} size="large" />
              <Flex vertical>
                <Typography.Text strong>{conversation?.name}</Typography.Text>
                <ConfigProvider
                  theme={{
                    components: {
                      Typography: { colorText: selectedTheme.secondary },
                    },
                  }}
                >
                  <Typography.Text>{conversation?.description}</Typography.Text>
                </ConfigProvider>
              </Flex>
            </Flex>
            <Flex>
              <Popover
                content={
                  <Space>
                    <UserSelect style={{ width: 300 }} maxTagCount={2} />
                    <Button>Add</Button>
                  </Space>
                }
                placement="bottomRight"
                trigger="click"
              >
                <Button type="link" icon={<UsergroupAddOutlined />} />
              </Popover>
              <Button
                onClick={() => addMemberRef.current.open()}
                type="link"
                icon={<MoreOutlined style={{ fontSize: "16px" }} />}
              />
            </Flex>
          </Flex>
        </Layout.Header>
        <Layout.Content
          id="scrollableDiv"
          className="content"
          ref={chatContentRef}
        >
          {messages.length === 0 ? (
            <div>Chưa có cuộc hội thoại nào</div>
          ) : (
            <InfiniteScroll
              dataLength={messages.length}
              next={fetchData}
              style={{ display: "flex", flexDirection: "column-reverse" }}
              hasMore={hasMore}
              loader={<h4>Loading...</h4>}
              scrollableTarget="scrollableDiv"
              inverse
            >
              {messages.map((msg, i) => (
                <Message key={i} message={msg} />
              ))}
            </InfiniteScroll>
          )}
        </Layout.Content>
        <Layout.Footer className="chat-footer">
          <Input.TextArea
            onChange={applyChange}
            value={message}
            className="chat-input"
            placeholder="Nhập tin nhắn..."
            autoSize={{ minRows: 1, maxRows: 5 }}
          />
          <Space className="chat-send-actions">
            <Popover
              overlayClassName="custom-popover"
              arrow={false}
              placement="topLeft"
              trigger="click"
              content={
                <EmojiPicker
                  lazyLoadEmojis
                  theme="dark"
                  onEmojiClick={onEmojiClick}
                />
              }
            >
              <FrownOutlined />
            </Popover>
            <Button onClick={sendMessage} type="link" icon={<SendOutlined />} />
          </Space>
        </Layout.Footer>
      </Layout>
      <AddMember ref={addMemberRef} />
    </ConfigProvider>
  );
};

export default ChatWindow;
