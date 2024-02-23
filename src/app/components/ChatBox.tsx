import React from 'react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';

interface ChatBoxProps {
    messages: {
        username: string;
        text: string;
    }[];
    addMessage: (message: { username: string; text: string }) => void; 
    userInput: string;
    setUserInput: (input: string) => void;
}

const ChatBox: React.FC<ChatBoxProps> = ({ messages, addMessage, userInput, setUserInput }) => {
    return (
        <div>
            <div>
                {messages.map((message, i) => (
                    <ChatMessage key={i} fontSize={16} username={message.username} text={message.text} />
                ))}
            </div>
            <ChatInput userInput={userInput} setUserInput={setUserInput} send={() => addMessage({ username: 'user', text: userInput })} />
        </div>
    );
};

export default ChatBox;