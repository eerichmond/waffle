import React from 'react';

interface ChatInputProps {
    userInput: string;
    setUserInput: (input: string) => void;
    send: () => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ userInput, setUserInput, send }) => {
    return (
        <div>
            <input
                type="text"
                value={userInput}
                placeholder='Message...'
                onChange={(e) => setUserInput(e.target.value)}
                style={{
                    backgroundColor: "white",
                    color: "black",
                    border: "1px solid black",
                }}
            />
            <button onClick={() => send()}>Send</button>
        </div>
    );
};

export default ChatInput;