"use client"

import { useEffect, useMemo, useRef, useState } from "react";

import ContentEditable from 'react-contenteditable';
import { colorBySimilarity, getSimilarity } from "./utils";

export default function Home() {
  const [thesis, setThesis] = useState('');
  const [thoughts, setThoughts] = useState('');
  const [styledThoughts, setStyledThoughts] = useState('<div></div>');
  const sentenceSimilarityCache = useRef<Record<string, number>>({});

  useEffect(() => {
    const colorAll = async (str: string) => {
      const split = str.split('.');
      const styled = [];
      for (let i = 0; i < split.length; i++) {
        let similarity = 0;
        if (sentenceSimilarityCache.current[split[i]]) {
          similarity = sentenceSimilarityCache.current[split[i]];
        } else {
          similarity = await getSimilarity(thesis, split[i]);
          sentenceSimilarityCache.current[split[i]] = similarity;
          console.log('cache', sentenceSimilarityCache.current);
        }
        console.log(split[i], similarity);
        styled.push(colorBySimilarity(split[i], similarity));
      }
      setStyledThoughts(styled.join('. '));
    }

    const endings = ['.', ' ', '\n', ';'];
    if (
      endings.includes(thoughts[thoughts.length - 1]) ||
      thoughts[thoughts.length - 1]?.trim() == ''
    ) {
      console.log('coloring');
      colorAll(thoughts);
    }
  }, [thoughts, thesis]);

  const maybeColoredThoughts = useMemo(() => {
    const split = thoughts.split('.');

    const sentences = [];
    for (let i = 0; i < split.length; i++) {
      if (sentenceSimilarityCache.current[split[i]]) {
        const similarity = sentenceSimilarityCache.current[split[i]];
        sentences.push(colorBySimilarity(split[i], similarity));
      } else {
        sentences.push(split[i]);
      }
    }

    return sentences.join('.');
  }, [thoughts, thesis, sentenceSimilarityCache.current]);

  useEffect(() => {
    sentenceSimilarityCache.current = {};
  }, [thesis]);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="w-full h-full flex gap-2">
        <div className="w-3/4">

          <textarea className="text-black bg-white w-full h-40" placeholder="Enter your thesis here" onChange={(event) => setThesis(event.target.value)} value={thesis}></textarea>
          <ContentEditable
            html={maybeColoredThoughts}
            className="text-black bg-white w-full h-40"
            onChange={(event) => { setThoughts(event.currentTarget.textContent || '') }}
          />
        </div>
        <div
          className="w-1/4 h-full"
          dangerouslySetInnerHTML={{ __html: styledThoughts }}
        >
        </div>
      </div>
    </main >
  );
}
