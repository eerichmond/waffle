"use client";

import Image from "next/image";
import { useState, useEffect, useRef, useMemo } from "react";

import { useQuery } from "convex/react";

import { api } from "../convex/_generated/api";
import { colorBySimilarity } from "./utils";
import ContentEditable from "./ContentEditableComponent";
import ChatComponent from "./components/ChatComponent";
export default function Home() {
  const [thesis, setThesis] = useState("");
  const [thoughts, setThoughts] = useState("");
  const sentenceSimilarityCache = useRef<Record<string, number>>({});

  useEffect(() => {
    sentenceSimilarityCache.current = {};
  }, [thesis]);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="w-full h-full flex gap-2">
        <div className="w-3/4">
          <textarea
            className="text-black bg-white w-full h-40"
            placeholder="Enter your thesis here"
            onChange={event => setThesis(event.target.value)}
            value={thesis}
          ></textarea>
          <ContentEditable thesis={thesis} thoughts={thoughts} setThoughts={setThoughts} />
          <ChatComponent />
        </div>
      </div>
    </main>
  );
}
