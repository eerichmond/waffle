import React from "react";

interface ChatInputProps {
  userInput: string;
  setUserInput: (input: string) => void;
  send: () => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ userInput, setUserInput, send }) => {
  return (
    <div className="chat__input__container">
      <input
        type="text"
        value={userInput}
        onChange={e => setUserInput(e.target.value)}
        className="chat__input"
        placeholder="type your message"
      />
      <button onClick={() => send()} className="chat__send__btn">
        Send
      </button>
    </div>
  );
};

export default ChatInput;
