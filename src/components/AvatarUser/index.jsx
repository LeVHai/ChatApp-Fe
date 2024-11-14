import React, { useRef, useState } from "react";
import "./styles.scss";
import { Avatar } from "antd";

const AvatarUsers = ({ size, icon, src }) => {
  return (
    <>
      <span className="avatar" >
        <Avatar
          style={{
            width: size,
            height: size,
            border: "3px solid white",
            boxShadow: "0 0 2px rgba(0, 0, 0, 0.5)",
          }}
          src={src}
        />
        <div
          className="upload-avatar"
          style={{ width: size / 2.5, height: size / 2.5 }}
        >
          {icon}
        </div>
      </span>
    </>
  );
};

export default AvatarUsers;
