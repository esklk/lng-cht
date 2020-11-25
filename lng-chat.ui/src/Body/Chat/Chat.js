import "./Chat.css";
import React, { useState } from "react";
import ChatList from "./ChatList/ChatList";
import Messages from "./Messages/Messages";

export default function Chat() {
  const [selectedChatId, setSelectedChatId] = useState();

  const handleChatSelected = (id) => {
    setSelectedChatId(id);
  };

  return (
    <div className="chats-container">
      <ChatList onChatSelected={handleChatSelected} />
      <Messages chatId={selectedChatId} />
    </div>
  );
}
