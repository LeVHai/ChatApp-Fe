import {
  Avatar,
  Button,
  Flex,
  Form,
  Input,
  Modal,
  Space,
  Upload,
  message,
} from "antd";
import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import "./styles.scss";
import {
  CameraOutlined,
  EditOutlined,
  LeftOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import AvatarUsers from "../AvatarUser";
import AvatarEditor from "react-avatar-editor";
import uploadImageCloudinary from "../../core/service/cloudinary";
import { updateInfoUser } from "../../core/action/userAction";

const Profile = forwardRef((props, ref) => {
  const { user } = useSelector((state) => state.userReducer);
  const [isProfileModalVisible, setProfileModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isImageEditorVisible, setImageEditorVisible] = useState(false);
  const [newName, setNewName] = useState(user?.name || "");
  const [selectedImage, setSelectedImage] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [loading, setLoading] = useState(false);
  const avatarEditorRef = useRef();
  const dispatch = useDispatch();
  useImperativeHandle(ref, () => ({
    open: () => {
      setProfileModalVisible(true);
    },
  }));

  const closeImageEditor = () => {
    setImageEditorVisible(false);
    if (selectedImage) {
      URL.revokeObjectURL(selectedImage);
      setSelectedImage(null);
    }
  };

  const closeProfileModal = () => {
    setProfileModalVisible(false);
    setIsEditing(false);
  };

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  const handleImageSelection = (file) => {
    setSelectedImage(file);
    setImageEditorVisible(true);
    return false; // Prevent default upload behavior
  };

  const handleSaveProfile = async () => {
    setLoading(true);
    let avatarUrl = user?.avatar;

    if (avatarEditorRef.current) {
      const canvas = avatarEditorRef.current.getImage();
      const dataURL = canvas.toDataURL();
      const response = await fetch(dataURL);
      const blob = await response.blob();

      const formData = new FormData();
      formData.append("file", blob, "avatar.jpg");
      formData.append("upload_preset", "lehai_cloudinary");
      formData.append("cloud_name", "dfbsf6cgl");

      try {
        const uploadResult = await uploadImageCloudinary(formData);
        avatarUrl = uploadResult.secure_url;
      } catch (error) {
        message.error(
          "Error occurred while uploading avatar: " + error.message
        );
        return;
      }
    }

    // Dispatch action to update both name and avatar
    dispatch(
      updateInfoUser({ avatar: avatarUrl, name: newName }, (res) => {
        if (res) {
          setLoading(false);
          closeImageEditor();
          closeProfileModal();
        }
      })
    );
  };

  return (
    <>
      <Modal
        open={isProfileModalVisible}
        onCancel={closeProfileModal}
        footer={
          isEditing && (
            <Button
              icon={loading && <LoadingOutlined />}
              disabled={loading}
              onClick={handleSaveProfile}
            >
              Lưu
            </Button>
          )
        }
      >
        <div className="profile-container">
          <div
            className={`profile-content ${isEditing ? "editing" : "profile"}`}
          >
            <div>Chỉnh sửa thông tin</div>
            <AvatarUsers
              icon={
                <Upload
                  accept="image/*"
                  beforeUpload={handleImageSelection}
                  showUploadList={false}
                  customRequest={() => {}}
                >
                  <CameraOutlined
                    className="icon-camera"
                    style={{ fontSize: 16 }}
                  />
                </Upload>
              }
              src={user?.avatar}
              size={60}
            />
            <Flex>
              <p className="profile_text">
                Tên người dùng: <span className="text-bold">{user?.name}</span>
              </p>
              <Button
                icon={<EditOutlined />}
                type="link"
                onClick={toggleEditMode}
              />
            </Flex>
            <p className="profile_text">
              Email: <span className="text-bold">{user?.email}</span>
            </p>
          </div>

          {isEditing && (
            <div className="edit-section">
              <Space>
                <Button
                  onClick={toggleEditMode}
                  icon={<LeftOutlined />}
                  type="link"
                />
                <span>Chỉnh sửa thông tin</span>
              </Space>
              <Form layout="vertical">
                <Form.Item label="Nhập tên hiển thị">
                  <Input
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="Nhập tên của bạn"
                  />
                </Form.Item>
              </Form>
            </div>
          )}
        </div>
      </Modal>

      <Modal
        style={{ top: 20 }}
        width={450}
        closeIcon={false}
        open={isImageEditorVisible}
        onCancel={closeImageEditor}
        footer={
          <Space>
            <Button onClick={closeImageEditor}>Hủy</Button>
            <Button
              icon={loading && <LoadingOutlined />}
              disabled={loading}
              type="primary"
              onClick={handleSaveProfile}
            >
              Tải ảnh lên
            </Button>
          </Space>
        }
      >
        <AvatarEditor
          ref={avatarEditorRef}
          image={selectedImage}
          width={400}
          height={400}
          border={1}
          borderRadius={200}
          scale={zoomLevel}
          rotate={0}
        />
        <input
          type="range"
          min="1"
          max="2"
          step="0.01"
          value={zoomLevel}
          onChange={(e) => setZoomLevel(parseFloat(e.target.value))}
        />
      </Modal>
    </>
  );
});

export default Profile;
