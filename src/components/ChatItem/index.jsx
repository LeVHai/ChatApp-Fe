import { Avatar, Flex, Typography } from 'antd'
import React from 'react'
import './styles.scss'
import { Link } from 'react-router-dom'
const ChatItem = ({id,conversation,onSelect,activeKey}) => {
  const onClick = ()=>{
    onSelect(conversation)
  }
  return (
    <Link to={`/chat/${id}`}>
    <Flex onClick={onClick} gap="small" align='center' className={`chat-item ${activeKey ? 'isActive' : ''}`}>
    <div>
    <Avatar size={45}/>
    </div>
    <Flex vertical>
      <Typography.Text strong>{conversation?.name}</Typography.Text>
      <Typography.Text className='desc-conversation' type="secondary">{conversation?.description}</Typography.Text>
    </Flex>
  </Flex>
    </Link>
  )
}

export default ChatItem