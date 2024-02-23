"use client";

import { useEffect, useRef, useState } from "react";

import { sizeBySimilarity } from "./utils";
import ContentEditable from 'react-contenteditable';
import { useQuery, useAction } from "convex/react";
import { api } from "@/convex/_generated/api";
import ChatBox from "./components/ChatBox";
import { UsernameInput } from "./components/UsernameInput";

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
        <div  
          className="h-1/4 flex flex-row gap-2"
        >
          <UsernameInput username={username} setUsername={setUsername} />
        </div>
        <div
          className="h-3/4"
          >
        <ChatBox
          messages={messagesWithSimilarity || []}
          addMessage={message => postMessage({ message, author: username })}
          userInput={userInput}
          setUserInput={setUserInput}
        />
        </div>
      </div>
      {/* <div>{JSON.stringify(users)}</div> */}
      {/* <div>{JSON.stringify(messagesWithSimilarity)}</div>
      <div className="w-full h-full flex gap-2">
        <div className="w-3/4">
          <textarea
            className="text-black bg-white w-full h-40"
            placeholder="Enter your thesis here"
            onChange={event => setThesis(event.target.value)}
            value={thesis}
          ></textarea>
          <ContentEditable thesis={thesis} thoughts={thoughts} setThoughts={setThoughts} />
          <button
            onClick={() => {
              postMessage({ message: thoughts, author: "miles" });
              setThoughts("");
            }}
          >
            Post
          </button>
        </div>
      </div> */}
    </main>
  );
}
