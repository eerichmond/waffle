import React, { FC } from 'react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';

interface ChatBoxProps {
    messages: {
        _id: string;
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

const ChatBox: FC<ChatBoxProps> = ({ messages, addMessage, userInput, setUserInput }) => {
    return (
        <div>
            <div>
                {messages.map(({ _id, author, message, similarity }) => (
                    <ChatMessage
                        key={_id}
                        fontSize={similarityToFontSize(similarity)}
                        author={author}
                        message={message}
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