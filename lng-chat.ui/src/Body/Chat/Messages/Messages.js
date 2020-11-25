import "./Messages.css";
import React, { useEffect, useState } from "react";
import { chatService } from "../../../Shared/Services/chatService";
import { useI18n } from "../../../Shared/i18nContext";
import { CircularProgress } from "@material-ui/core";
import { accountService } from "../../../Shared/Services/accountService";

const limit = 100;

export default function Messages({ chatId }) {
  const userId = parseInt(accountService.userId);

  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [messages, setMessages] = useState([]);
  const i18n = useI18n();

  useEffect(() => {
    setPage(0);
    setMessages([]);
  }, [chatId]);

  useEffect(() => {
    if (!chatId) {
      return;
    }
    setIsLoading(true);
    chatService
      .getMessagesAsync(chatId, limit, limit * page)
      .then((result) => setMessages((c) => c.concat(result ?? [])))
      .catch(() => console.log("Error while loading message list."))
      .finally(() => setIsLoading(false));
  }, [page, chatId]);

  return (
    <div className="messages-container">
      {isLoading ? (
        <div className="messages-loader-container">
          <CircularProgress />
        </div>
      ) : messages ? (
        <div className="message-list">
          {messages.map((message, index) => {
            return (
              <div
                key={message.id}
                className={`${
                  message.senderId === userId ? "outgoing" : "incoming"
                } message${
                  messages.length === index + 1 ||
                  messages[index + 1].senderId !== message.senderId
                    ? " last"
                    : ""
                }`}
              >
                {message.text}
              </div>
            );
          })}
        </div>
      ) : (
        i18n.nothingCouldBeFound
      )}
    </div>
  );
}
