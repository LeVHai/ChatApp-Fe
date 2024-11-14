import { Avatar } from "antd";
import "./styles.scss";
import { useTheme } from "../../hooks/useTheme";
import { Link } from "react-router-dom";

const ConversationItem = ({ _id, activeId, isActive, avatar, name, description, setActiveId }) => {
  const { selectedTheme } = useTheme();
  
  return (
    <Link to={`/chat/${_id}`}>
      <div
        onClick={() => setActiveId(_id)} // Cập nhật activeId khi click
        className="conversation-item"
        style={isActive ? { backgroundColor: selectedTheme.secondary } : {}}
      >
        <div>
          <Avatar src={avatar} size="large" />
        </div>
        <div className="content">
          <span className="name" style={{ color: selectedTheme.textPrimary }}>{name}</span>
          <span className="mess" style={{ color: selectedTheme.textSecondary }}>{description}</span>
        </div>
      </div>
    </Link>
  );
};

export default ConversationItem;
