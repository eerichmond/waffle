"use client";

import { useEffect, useRef, useState } from "react";
import { useQuery, useAction } from "convex/react";
import ChatBox from "./components/ChatBox";
import { UsernameInput } from "./components/UsernameInput";
import { api } from "../convex/_generated/api";

export default function Home() {
  const [username, setUsername] = useState("");
  const [userInput, setUserInput] = useState("");

  const postMessage = useAction(api.messages.writeMessage);
  const messagesWithSimilarity = useQuery(api.messages.getMessagesWithRelativeSimilarity, {
    username: username,
  });

  console.log(messagesWithSimilarity);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="w-full h-full flex gap-2 flex-col">
        <div className="h-1/4 flex flex-row gap-2">
          <UsernameInput username={username} setUsername={setUsername} />
        </div>
        <div className="h-3/4">
          <ChatBox
            messages={messagesWithSimilarity || []}
            addMessage={message => postMessage({ message, author: username })}
            userInput={userInput}
            setUserInput={setUserInput}
          />
        </div>
      </div>
    </main>
  );
}
