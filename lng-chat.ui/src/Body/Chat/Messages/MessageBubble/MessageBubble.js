import "./MessageBubble.css";
import React from "react";
import VoiceMessagePlayer from "../VoiceMessagePlayer/VoiceMessagePlayer";

export default function MessageBubble({ userId, message, nextMessage }) {
  const sentAtDate = new Date(message.sentAt);

  const isToday = (function () {
    let nowDate = new Date();
    return (
      sentAtDate.getDate() === nowDate.getDate() &&
      sentAtDate.getMonth() === nowDate.getMonth() &&
      sentAtDate.getFullYear() === nowDate.getFullYear()
    );
  })();

  return (
    <div
      className={`${
        message.senderId === userId ? "outgoing" : "incoming"
      } message${
        !nextMessage || nextMessage.senderId !== message.senderId ? " last" : ""
      }`}
    >
      {message.isImage ? (
        <img src={message.content} alt="content" />
      ) : message.isVoice ? (
        <div className="voice-message-player-container"><VoiceMessagePlayer src={message.content} /></div>
      ) : (
        message.content
      )}
      <p className="sent-at">
        {isToday
          ? sentAtDate.toLocaleTimeString()
          : sentAtDate.toLocaleDateString()}
      </p>
    </div>
  );
}
