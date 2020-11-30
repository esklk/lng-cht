import "./Chat.css";
import React, { useState } from "react";
import ChatList from "./ChatList/ChatList";
import Messages from "./Messages/Messages";

export default function Chat() {
  const [selectedChat, setSelectedChat] = useState();
  const [messagesOpened, setMessagesOpened] = useState();

  const handleChatSelected = (chat) => {
    setMessagesOpened(true);
    setSelectedChat(chat);
  };

  const handleMessagesBackButtonClick = () => {
    setMessagesOpened(false);
    setSelectedChat(null);
  };

  return (
    <div className="chats-container">
      <ChatList className="chat-list" onChatSelected={handleChatSelected} />
      <Messages
        className={`messages${messagesOpened ? " opened" : ""}`}
        chatId={selectedChat?.id}
        chatName={selectedChat?.name}
        onBackButtonClick={handleMessagesBackButtonClick}
      />
    </div>
  );
}
