import React from 'react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';

interface ChatBoxProps {
    messages: {
        author: string;
        message: string;
        similarity: number;
    }[];
    addMessage: (message: string) => void;
    userInput: string;
    setUserInput: (input: string) => void;
}

const similarityToFontSize = (similarity: number) => {
    return 4 + similarity * 24;
}

const ChatBox: React.FC<ChatBoxProps> = ({ messages, addMessage, userInput, setUserInput }) => {
    return (
        <div>
            <div>
                {messages.map((message, i) => (
                    <ChatMessage
                        key={i}
                        fontSize={similarityToFontSize(message.similarity)}
                        author={message.author}
                        message={message.message}
                    />
                ))}
            </div>
            <ChatInput userInput={userInput} setUserInput={setUserInput} send={() => {
                setUserInput('')
                addMessage(userInput)
            }} />
        </div>
    );
};

export default ChatBox;