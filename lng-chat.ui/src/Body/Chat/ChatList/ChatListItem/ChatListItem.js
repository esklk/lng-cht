import "./ChatListItem.css";
import React from "react";
import { Avatar, Button } from "@material-ui/core";

export default function ChatListItem({
  id,
  pictureUrl,
  label,
  description,
  onClick,
}) {
  const handleClick = () => {
    if (onClick) {
      onClick(id);
    }
  };

  return (
    <Button className="chat-list-item-container" onClick={handleClick}>
      <Avatar src={pictureUrl} />
      <div className="chat-list-item-data">
        <p className="chat-list-item-data-label">{label}</p>
        <p className="chat-list-item-data-description">{description}</p>
      </div>
    </Button>
  );
}
