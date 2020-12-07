import "./Messages.css";
import React, { useEffect, useState } from "react";
import { chatService } from "../../../Shared/Services/chatService";
import { useI18n } from "../../../Shared/i18nContext";
import { CircularProgress, IconButton } from "@material-ui/core";
import { accountService } from "../../../Shared/Services/accountService";
import MessageBubble from "./MessageBubble/MessageBubble";
import MessageSender from "./MessageSender/MessageSender";
import { ArrowBackIosRounded } from "@material-ui/icons";
import { useChat } from "../../../Shared/ChatContext";

const limit = 100;

export default function Messages({
  chatId,
  chatName,
  onBackButtonClick,
  ...props
}) {
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
      .then(() => {})
      .catch((error) =>
        console.error("Error while loading message list", error)
      )
      .finally(() => setIsLoading(false));
  }, [page, chatId]);

  useChat((message) => {
    if (message.chatId === chatId) {
      setMessages([...messages, message]);
      setPage(0);
    }
  });

  return (
    <div {...props}>
      {chatId ? (
        isLoading ? (
          <div className="messages-middle-container">
            <CircularProgress />
          </div>
        ) : (
          <div className="messages-container">
            <div className="chat-header">
              <IconButton
                onClick={onBackButtonClick}
                className="btn-back"
                size="small"
              >
                <ArrowBackIosRounded fontSize="inherit" />
              </IconButton>
              <p>{chatName}</p>
            </div>
            {messages ? (
              <div className="message-list">
                <div
                  ref={(bc) => {
                    if (bc && page === 0 && messages.length > 0) {
                      bc.scrollTop = bc.scrollHeight;
                    }
                  }}
                  className="bubbles-container"
                >
                  {messages.map((message, index) => (
                    <MessageBubble
                      key={message.id}
                      userId={userId}
                      message={message}
                      nextMessage={
                        messages.length > index + 1 ? messages[index + 1] : null
                      }
                    />
                  ))}
                </div>
              </div>
            ) : (
              i18n.hereAreNoMessagesYet
            )}
            <MessageSender />
          </div>
        )
      ) : (
        <div className="messages-middle-container">
          {i18n.pleaseSelectAChat}
        </div>
      )}
    </div>
  );
}
