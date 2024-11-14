import React, { useImperativeHandle, useRef, useState, forwardRef } from "react";
import "./styles.scss";
import { Button, Modal, Space, Upload } from "antd";
import AvatarEditor from "react-avatar-editor";

const UploadAvatar = forwardRef((props, ref) => {
  const [show, setShow] = useState(false);
  const [imagePreviews, setImagePreviews] = useState("");
  const [scale, setScale] = useState(1);
  const editorRef = useRef();

  const getBlob = () => {
    return new Promise((resolve) => {
      if (editorRef.current) {
        const canvas = editorRef.current.getImage();
        canvas.toBlob((blob) => resolve(blob), 'image/png');
      } else {
        resolve(null);
      }
    });
  };

  const onCancel = () => {
    setShow(false);
    URL.revokeObjectURL(imagePreviews);
    setImagePreviews("");
  };

  const handleImageSelection = (file) => {
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreviews(previewUrl);
      setShow(true);
    }
    return false;
  };

  const onConfirm = async () => {
    const blob = await getBlob();
    if (blob) {
     props.upload(blob)
    }
    onCancel();
  };

  return (
    <>
      <Upload
        accept="image/*"
        beforeUpload={handleImageSelection}
        showUploadList={false}
        customRequest={() => {}}
      >
        {props.children}
      </Upload>
      <Modal
        style={{ top: 20 }}
        width={450}
        closeIcon={false}
        open={show}
        onCancel={onCancel}
        footer={
          <Space>
            <Button onClick={onCancel}>Hủy</Button>
            <Button type="primary" onClick={onConfirm}>
              Xác nhận
            </Button>
          </Space>
        }
      >
        <AvatarEditor
          ref={editorRef}
          image={imagePreviews}
          width={400}
          height={400}
          border={1}
          borderRadius={400}
          scale={scale}
          rotate={0}
        />
        <input
          type="range"
          min="1"
          max="2"
          step="0.01"
          value={scale}
          onChange={(e) => setScale(parseFloat(e.target.value))}
        />
      </Modal>
    </>
  );
});

export default UploadAvatar;
