"use client";

import { useEffect, useRef, useState } from "react";

import { sizeBySimilarity } from "./utils";
import ContentEditable from "./ContentEditableComponent";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function Home() {
  const [thesis, setThesis] = useState("");
  const [thoughts, setThoughts] = useState("");
  const sentenceSimilarityCache = useRef<Record<string, number>>({});

  const users = useQuery(api.users.get);
  const messages = useQuery(api.messages.get);

  useEffect(() => {
    sentenceSimilarityCache.current = {};
  }, [thesis]);
  return (
    <main className="flex min-h-screen flex-col justify-between p-24">
      {messages?.map(({ _id, author, message, }) => {
        return <div key={_id} style={{ border: "solid 1px lightgray", padding: "10px 0" }}>{message} <span style={{ fontSize: 'smaller' }}>{author}</span></div>
      })}
      <hr />
      <div className="w-full h-full flex gap-2">
        <div className="w-3/4">
          <textarea
            className="text-black bg-white w-full h-40"
            placeholder="Enter your thesis here"
            onChange={event => setThesis(event.target.value)}
            value={thesis}
          ></textarea>
          <ContentEditable thesis={thesis} thoughts={thoughts} setThoughts={setThoughts} />
        </div>
      </div>
    </main>
  );
}
