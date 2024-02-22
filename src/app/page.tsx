"use client"

import Image from "next/image";
import sanitizeHtml from "sanitize-html"
import ContentEditable from 'react-contenteditable';
import { useEffect, useState } from "react";

const getSimilarity = async (sentence1: string, sentence2: string) => {
  if (sentence1 === '' || sentence2 === '') {
    console.log('empty sentence');
    return 0;
  }

  const response = await fetch('/api/sentence_similarity', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      sentence1,
      sentence2
    })
  });

  const data = await response.json();
  console.log(data);
  return data;
}

export default function Home() {
  const [thesis, setThesis] = useState('');
  const [thoughts, setThoughts] = useState('');
  const [styledThoughts, setStyledThoughts] = useState('<div></div>');

  useEffect(() => {
    const colorByIndex = (str: string, index: number) => {
      const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'pink', 'orange'];
      return '<span style="color:' + colors[index % colors.length] + '">' + str + '</span>';
    }

    const styled = thoughts.split('.').map((thought, index) => {
      return colorByIndex(thought, index);
    });

    setStyledThoughts(styled.join('.'));
  }, [thoughts]);

  useEffect(() => {
    const getSimilarities = async () => {
      const sentences = thoughts.split('.');
      const similarities = [];

      for (let i = 0; i < sentences.length; i++) {
        const similarity = await getSimilarity(thesis, sentences[i]);
        console.log(sentences[i], similarity);
        similarities.push(similarity);
      }
      return similarities;
    }

    getSimilarities();
  }, [thesis, thoughts]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="w-full h-full flex gap-2">
        <div className="w-3/4">

          <textarea className="text-black bg-white w-full h-40" placeholder="Enter your thesis here" onChange={(event) => setThesis(event.target.value)}>{thesis}</textarea>
          <ContentEditable
            html={styledThoughts}
            className="text-black bg-white w-full h-40"
            onChange={(event) => setThoughts(event.currentTarget.innerText)}
          />
        </div>
        {/* <div className="w-1/4">
          {styledThoughts}
        </div> */}
      </div>
    </main>
  );
}
