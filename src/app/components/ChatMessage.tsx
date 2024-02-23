import React from 'react';

interface ChatMessageProps {
    fontSize: number;
    name: string;
    message: string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ fontSize, name, message }) => {
    return (
        <div style={{ fontSize }}>
            <strong>{name}: </strong> {message}
        </div>
    );
};

export default ChatMessage;