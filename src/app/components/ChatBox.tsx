import React from "react";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";

interface ChatBoxProps {
  messages: {
    username: string;
    text: string;
    newMessage: boolean;
  }[];
  addMessage: (message: { username: string; text: string }) => void;
  userInput: string;
  setUserInput: (input: string) => void;
}

const similarityToFontSize = (similarity: number) => {
  return 4 + similarity * 24;
};

const ChatBox: React.FC<ChatBoxProps> = ({ messages, addMessage, userInput, setUserInput }) => {
  return (
    <div>
      <div className="chat-box">
        {messages.map((message, i) => {
          if (message.username === "user") {
            return (
              <div className="right--column" key={i}>
                <ChatMessage
                  key={i}
                  fontSize={16}
                  username={message.username}
                  text={message.text}
                  newMessage={message.newMessage}
                />
              </div>
            );
          }
          return (
            <ChatMessage
              key={i}
              fontSize={16}
              username={message.username}
              text={message.text}
              newMessage={message.newMessage}
            />
          );
        })}
      </div>
      <ChatInput
        userInput={userInput}
        setUserInput={setUserInput}
        send={() => addMessage({ username: "user", text: userInput })}
      />
    </div>
  );
};

export default ChatBox;
