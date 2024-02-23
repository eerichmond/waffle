import React, { useEffect, useRef } from 'react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';

interface ChatBoxProps {
    userId: string;
    addMessage: (message: string) => void;
    userInput: string;
    setUserInput: (input: string) => void;
    allowInput?: boolean;
    fontScaleFactor: number;
}

const similarityToFontSize = (similarity: number, fontScaleFactor: number) => {
    return 20 - fontScaleFactor + (similarity + 0.5) * fontScaleFactor;
}

const ChatBox: React.FC<ChatBoxProps> = ({ userId, addMessage, userInput, setUserInput, allowInput, fontScaleFactor }) => {
    const messages = useQuery(api.messages.getMessagesWithRelativeSimilarity, {
        userId: userId,
    });

    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, fontScaleFactor]); // Dependency array ensures this runs only when messages change

    if (!messages) {
        
        return <div>Loading...</div>;
    }

    return (
        <div className='w-full md:w-3/4 lg:w-2/3 flex flex-col'>
            <div className='flex flex-col flex-grow'
                style={{
                    maxHeight: 'calc(100vh - 22em)',
                    overflowY: 'scroll',
                }}
            >
                {messages.map((message, i) => (
                    <ChatMessage
                        key={i}
                        fontSize={similarityToFontSize(message.similarity, fontScaleFactor)}
                        name={message.name}
                        message={message.message}
                    />
                ))}
                <div ref={messagesEndRef} />
            </div>
                <ChatInput
                    userInput={userInput}
                    setUserInput={setUserInput}
                    send={() => {
                        setUserInput('')
                        addMessage(userInput)
                    }}
                    allowInput={allowInput}
                />
        </div >
    );
};

export default ChatBox;