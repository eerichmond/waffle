import * as React from "react";

import ChatBox from "./ChatBox";
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";
const ChatComponent = () => {
  const [messages, setMessages] = React.useState([
    { username: "tim", text: "Hello!" },
    { username: "tim", text: "How are you?" },
  ]);
  //   const [user, setUser] = React.useState("miles");

  const [usersMessage, setUsersMessage] = React.useState("");
  const handleAddMessage = message => {
    setMessages(prev => {
      return [...prev, message];
    });
    setUsersMessage("");
  };
  const handleMessageChange = event => {
    setUsersMessage(event);
  };

  return (
    <>
      {/* <ChatMessage  /> */}
      <ChatBox
        messages={messages}
        userInput={usersMessage}
        addMessage={handleAddMessage}
        setUserInput={handleMessageChange}
        addMesssage={handleAddMessage}
      />
      {/* <ChatInput /> */}
    </>
  );
};

export default ChatComponent;
