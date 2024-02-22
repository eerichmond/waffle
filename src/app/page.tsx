"use client"

import Image from "next/image";
import { useState } from "react";

import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";

export default function Home() {
  const [thesis, setThesis] = useState('');
  const [thoughts, setThoughts] = useState('');

  const chatgpt = useQuery(api.chatgpt.get, { sentence: "testing sentence" });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>SAMPLES: {chatgpt}</div>
      <div className="w-full h-full flex gap-2">
        <div className="w-3/4">

          <textarea className="text-black bg-white w-full h-40" placeholder="Enter your thesis here" onChange={(event) => setThesis(event.target.value)} value={thesis}></textarea>
          <textarea
            className="min-h-screen w-full text-black bg-white"
            placeholder="Enter your thoughts here"
            onChange={(event) => setThoughts(event.target.value)}
            value={thoughts}
          ></textarea>
        </div>
        <div className="w-1/4">-- Result here --</div>
      </div>
    </main>
  );
}
