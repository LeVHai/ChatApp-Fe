import {
  PlusOutlined,
  PlusSquareFilled,
  UserAddOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Flex, Input, Space } from "antd";
import React from "react";
import ConversationItem from "../../components/ConversationItem/ConversationItem";
import { useTheme } from "../../hooks/useTheme";

const Conversation = () => {
  const {theme,selectedTheme} = useTheme()
  return (
     
      <div className="conversation-list">
      <ConversationItem name="d" isActive={true} message={"Lorfasdfhadsf adsfasdf adsfahdfs adsfgfdsgdfgfdgdfgfd"}/>
      <ConversationItem name="d" message={"Lorfasdfhadsf adsfasdf adsfahdfs adsfgfdsgdfgfdgdfgfd"}/>
      <ConversationItem name="d" message={"Lorfasdfhadsf adsfasdf adsfahdfs adsfgfdsgdfgfdgdfgfd"}/>
      <ConversationItem name="d" message={"Lorfasdfhadsf adsfasdf adsfahdfs adsfgfdsgdfgfdgdfgfd"}/>
      <ConversationItem name="d" message={"Lorfasdfhadsf adsfasdf adsfahdfs adsfgfdsgdfgfdgdfgfd"}/>
      <ConversationItem name="d" message={"Lorfasdfhadsf adsfasdf adsfahdfs adsfgfdsgdfgfdgdfgfd"}/>
      <ConversationItem name="d" isActive={true} message={"Lorfasdfhadsf adsfasdf adsfahdfs adsfgfdsgdfgfdgdfgfd"}/>
      <ConversationItem name="d" message={"Lorfasdfhadsf adsfasdf adsfahdfs adsfgfdsgdfgfdgdfgfd"}/>
      <ConversationItem name="d" message={"Lorfasdfhadsf adsfasdf adsfahdfs adsfgfdsgdfgfdgdfgfd"}/>
      <ConversationItem name="d" message={"Lorfasdfhadsf adsfasdf adsfahdfs adsfgfdsgdfgfdgdfgfd"}/>
      <ConversationItem name="d" message={"Lorfasdfhadsf adsfasdf adsfahdfs adsfgfdsgdfgfdgdfgfd"}/>
      <ConversationItem name="d" message={"Lorfasdfhadsf adsfasdf adsfahdfs adsfgfdsgdfgfdgdfgfd"}/>
      <ConversationItem name="d" isActive={true} message={"Lorfasdfhadsf adsfasdf adsfahdfs adsfgfdsgdfgfdgdfgfd"}/>
      <ConversationItem name="d" message={"Lorfasdfhadsf adsfasdf adsfahdfs adsfgfdsgdfgfdgdfgfd"}/>
      <ConversationItem name="d" message={"Lorfasdfhadsf adsfasdf adsfahdfs adsfgfdsgdfgfdgdfgfd"}/>
      <ConversationItem name="d" message={"Lorfasdfhadsf adsfasdf adsfahdfs adsfgfdsgdfgfdgdfgfd"}/>
      <ConversationItem name="d" message={"Lorfasdfhadsf adsfasdf adsfahdfs adsfgfdsgdfgfdgdfgfd"}/>
      <ConversationItem name="d" message={"Lorfasdfhadsf adsfasdf adsfahdfs adsfgfdsgdfgfdgdfgfd"}/>
      </div>
  );
};

export default Conversation;
