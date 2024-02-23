import React from 'react';

interface ChatMessageProps {
    fontSize: number;
    author: string;
    message: string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ fontSize, author, message }) => {
    return (
        <div style={{ fontSize }}>
            <strong>{author}: </strong> {message}
        </div>
    );
};

export default ChatMessage;