import { CircularProgress } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useI18n } from "../../../Shared/i18nContext";
import { chatService } from "../../../Shared/Services/chatService";
import "./ChatList.css";
import ChatListItem from "./ChatListItem/ChatListItem";

const limit = 100;

export default function ChatList({ onChatSelected }) {
  const [isLoading, setIsLoading] = useState(true);
  // eslint-disable-next-line
  const [page, setPage] = useState(0);//TODO: update page when scrolled to bottom
  const [chats, setChats] = useState([]);
  const i18n = useI18n();

  useEffect(() => {
    setIsLoading(true);
    chatService
      .getChatListAsync(limit, limit * page)
      .then((result) => setChats((c) => c.concat(result ?? [])))
      .catch(() => console.log("Error while loading chat list."))
      .finally(() => setIsLoading(false));
  }, [page]);

  const handleChatListItemClick = (chatId) => {
    if (onChatSelected) {
      var chat = chats.find(x=>x.id === chatId);
      onChatSelected(chat);
    }
  };

  return (
    <div className="chat-list">
      {isLoading ? (
        <div className="chats-loader-container">
          <CircularProgress />
        </div>
      ) : chats ? (
        chats.map((chat) => (
          <ChatListItem
            key={chat.id}
            id={chat.id}
            pictureUrl={chat.pictureUrl}
            label={chat.name}
            description={chat.latestMessage.text}
            onClick={handleChatListItemClick}
          />
        ))
      ) : (
        i18n.nothingCouldBeFound
      )}
    </div>
  );
}
