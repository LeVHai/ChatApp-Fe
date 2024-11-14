import { Avatar, Flex, Input, Modal, Select, Typography } from "antd";
import React, { forwardRef, useImperativeHandle, useState } from "react";
import InputCustom from "../InputCustom";
import './styles.scss'
const AddMember = forwardRef((props,ref) => {
  const [isShowModal, setIsShowModal] = useState(false);
  useImperativeHandle(ref, () => ({
    open: () => {
      setIsShowModal(true);
    },
    update: () => {},
  }));
  const onCancel = () =>setIsShowModal(false)
  return (
     <Modal open={isShowModal} onCancel={onCancel} footer={null}  style={{top:20}} >
      <InputCustom  />
    <div className="list-member">
    <Flex align="center" gap="small">
        <Avatar></Avatar>
        <Typography.Text>Hai</Typography.Text>
    </Flex>
    <Flex align="center" gap="small">
        <Avatar></Avatar>
        <Typography.Text>Hai</Typography.Text>
    </Flex>
    <Flex align="center" gap="small">
        <Avatar></Avatar>
        <Typography.Text>Hai</Typography.Text>
    </Flex>
    <Flex align="center" gap="small">
        <Avatar></Avatar>
        <Typography.Text>Hai</Typography.Text>
    </Flex>
    </div>
    </Modal>
  );
});

export default AddMember;
