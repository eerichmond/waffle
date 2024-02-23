import React from 'react';

interface ChatMessageProps {
    fontSize: number;
    username: string;
    text: string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ fontSize, username, text }) => {
    return (
        <div style={{ fontSize }}>
            <strong>{username}: </strong> {text}
        </div>
    );
};

export default ChatMessage;