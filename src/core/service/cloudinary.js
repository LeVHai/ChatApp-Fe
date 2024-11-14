import axios from "axios";

const cloudName = "dfbsf6cgl";

const uploadImageCloudinary = async (formData) => {
  try {
    const res = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return res.data;
  } catch (err) {
    console.error("Upload failed:", err);
    return null; // Trả về null để xử lý khi có lỗi
  }
};

export default uploadImageCloudinary;
