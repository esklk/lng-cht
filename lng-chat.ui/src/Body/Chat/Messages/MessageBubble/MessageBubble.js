import "./MessageBubble.css";
import React from "react";

export default function MessageBubble({userId, message, nextMessage}) {
  return <div
  className={`${
    message.senderId === userId ? "outgoing" : "incoming"
  } message${
    !nextMessage ||
    nextMessage.senderId !== message.senderId
      ? " last"
      : ""
  }`}
>
  {message.text}
</div>;
}
