import { Avatar, Button, Form, Input, message, Modal, Space } from "antd";
import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import {
  postConversation,
  updateConversation,
} from "../../core/action/chatAction";
import { useDispatch } from "react-redux";
import { LoadingOutlined } from "@ant-design/icons";
import { isSuccess } from "../../utils";
import UploadAvatar from "../UploadAvatar";
import _, { cloneDeep } from "lodash";
import uploadImageCloudinary from "../../core/service/cloudinary";
const CreateConversation = forwardRef((props, ref) => {
  const [form] = Form.useForm();
  const ACTION = {
    CREATE: "create",
    UPDATE: "update",
  };
  const [conversation, setConversation] = useState(null);
  const [conversationUpdate, setConversationUpdate] = useState(null);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [action, setAction] = useState("");
  const [image, setImage] = useState({ file: "", preview: "" });
  const dispatch = useDispatch();
  useImperativeHandle(ref, () => ({
    create: () => {
      setShow(true);
      setAction(ACTION.CREATE);
    },
    update: (conversation) => {
      setShow(true);
      setAction(ACTION.UPDATE);
      setConversation(conversation);
      form.setFieldsValue(conversation);
    },
  }));
  const createConversation = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);
      const formData = new FormData();
      formData.append("file", image.file);
      formData.append("upload_preset", "lehai_cloudinary");
      formData.append("cloud_name", "dfbsf6cgl");
      const res = await uploadImageCloudinary(formData);
      const data = {
        ...values,
        avatar: res.secure_url

      }
      dispatch(
        postConversation(data, (res) => {
          if (isSuccess(res)) {
            message.info("Tạo cuộc hội thoại thành công!");
            setLoading(false);
            cancel();
          }
        })
      );
    } catch (error) {}
  };
  const updateConversationHandler = async () => {
    try {
      const values = await form.validateFields();
      const _conversation = {
        conversation_id: conversation.conversation_id,
        ...values,
      };
      setLoading(true);
      dispatch(
        updateConversation(_conversation, (res) => {
          console.log(res);
          if (isSuccess(res)) {
            props.updateTitleConversation(res.data.data);
            message.info("Cập nhật cuộc hội thoại thành công!");
            setLoading(false);
            cancel();
          }
        })
      );
    } catch (error) {}
  };

  const dialogFooter = () => {
    let btns = [];
    btns.push({
      label: "Huỷ",
      onClick: () => cancel(),
    });
    if (action === ACTION.CREATE) {
      btns.push({
        label: "Thêm",
        onClick: () => createConversation(),
        disabled: loading,
        type: "primary",
      });
    }
    if (action === ACTION.UPDATE) {
      btns.push({
        label: "Cập nhật",
        onClick: () => updateConversationHandler(),
        disabled: loading,
        type: "primary",
      });
    }
    return btns;
  };

  const cancel = () => {
    setShow(false);
    form.resetFields();
  };
  const beforeUpload = (file) => {
    const _image = cloneDeep(image);
    _image.file = file;
    _image.preview = URL.createObjectURL(file);
    setImage(_image);
  };
  console.log("dầdsfsd", image);

  return (
    <Modal
      open={show}
      onCancel={cancel}
      footer={
        <Space>
          {dialogFooter().map((btn, i) => (
            <Button
              key={i}
              disabled={btn.disabled}
              type={btn.type}
              onClick={btn.onClick}
            >
              {btn.label}
            </Button>
          ))}
        </Space>
      }
      className="create-room-modal"
    >
      <Form form={form} layout="vertical" className="create-room-form">
        <Form.Item label="Ảnh đại diện">
          <UploadAvatar upload={beforeUpload}>
            <Avatar size={60} src={image.preview} />
          </UploadAvatar>
        </Form.Item>
        <Form.Item
          name="name"
          rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}
          label="Tên phòng chat"
          className="form-item"
        >
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Mô tả" className="form-item">
          <Input.TextArea autoSize={{ minRows: 2 }} />
        </Form.Item>
      </Form>
    </Modal>
  );
});

export default CreateConversation;
