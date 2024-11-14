import React from 'react'
import {Input, InputProps} from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import './styles.scss'
const InputCustom = (props : InputProps) => { 
  return (
    <Input prefix={<SearchOutlined/>} {...props} />
  )
}

export default InputCustom