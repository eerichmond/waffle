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
                onChange={(e) => setUserInput(e.target.value)}
            />
            <button onClick={() => send()}>Send</button>
        </div>
    );
};

export default ChatInput;