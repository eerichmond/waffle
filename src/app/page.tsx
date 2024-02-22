import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [thesis, setThesis] = useState();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="w-full h-full flex gap-2">
        <div className="w-3/4">

          <textarea className="text-black bg-white w-full h-40" placeholder="Enter your thesis here"></textarea>
          <textarea
            className="min-h-screen w-full text-black bg-white"
            placeholder="Enter your thoughts here"
          ></textarea>
        </div>
        <div className="w-1/4">-- Result here --</div>
      </div>
    </main>
  );
}
