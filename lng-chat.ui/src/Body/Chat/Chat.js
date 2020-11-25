import "./Chat.css";
import React, { useState } from "react";
import ChatList from "./ChatList/ChatList";
import Messages from "./Messages/Messages";

export default function Chat() {
  const [selectedChat, setSelectedChat] = useState();

  const handleChatSelected = (chat) => {
    setSelectedChat(chat);
  };

  return (
    <div className="chats-container">
      <ChatList onChatSelected={handleChatSelected} />
      <Messages chatId={selectedChat?.id} chatName={selectedChat?.name} />
    </div>
  );
}
