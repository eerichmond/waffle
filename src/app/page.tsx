"use client"

import Image from "next/image";
import sanitizeHtml from "sanitize-html"
import ContentEditable from 'react-contenteditable';
import { useEffect, useState } from "react";

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
