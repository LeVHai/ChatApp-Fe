import { Avatar, Space, Typography } from "antd";
import React from "react";
import './styles.scss'
import { formatDate, formatTime } from "../../utils";
const Message = ({message}) => {
  return (
   <div>
     <Space align="start" style={{margin: "5px 0" }} size="small">
      <Avatar src={message?.avatar} />
      <div>
        <Typography.Text strong>{message?.name}</Typography.Text>{" "}
        <Typography.Text type="secondary" style={{fontSize:"12px"}}>{formatDate(message?.create_at)}</Typography.Text>
        <span className="mess-item">
        {message?.content}
        </span>
      </div>
    </Space>
   </div>
  );
};

export default Message;
