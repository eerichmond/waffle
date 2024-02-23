import React from "react";

interface ChatMessageProps {
  fontSize: number;
  username: string;
  text: string;
  newMessage: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ fontSize, username, text, newMessage }) => {
  return (
    <div
      style={{ fontSize }}
      className={`chat__message tri-right btm-left-in left--column ${newMessage ? "right--column" : ""}`}
    >
      <div className="talktext">
        <strong>{username}: </strong> {text}
      </div>
    </div>
  );
};

export default ChatMessage;
