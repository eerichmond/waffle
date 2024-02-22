import React, { useEffect, useState, useRef, useMemo } from "react";
import ContentEditable from "react-contenteditable";
import { colorBySimilarity, getSimilarity } from "./utils";

const ContentEditableComponent = ({ thesis, thoughts, setThoughts }) => {
  const sentenceSimilarityCache = useRef<Record<string, number>>({});
  const [styledThoughts, setStyledThoughts] = useState("<div></div>");

  useEffect(() => {
    const colorAll = async (str: string) => {
      const split = str.split(".");
      const styled = [];
      for (let i = 0; i < split.length; i++) {
        let similarity = 0;
        if (sentenceSimilarityCache.current[split[i]]) {
          similarity = sentenceSimilarityCache.current[split[i]];
        } else {
          similarity = await getSimilarity(thesis, split[i]);
          sentenceSimilarityCache.current[split[i]] = similarity;
          // console.log("cache", sentenceSimilarityCache.current);
        }
        // console.log(split[i], similarity);
        styled.push(colorBySimilarity(split[i], similarity));
      }
      setStyledThoughts(styled.join(". "));
    };

    const endings = [".", " ", "\n", ";"];
    if (endings.includes(thoughts[thoughts.length - 1]) || thoughts[thoughts.length - 1]?.trim() == "") {
      // console.log("coloring");
      colorAll(thoughts);
    }
  }, [thoughts, thesis]);

  const maybeColoredThoughts = useMemo(() => {
    const split = thoughts.split(".");

    const sentences = [];
    for (let i = 0; i < split.length; i++) {
      if (sentenceSimilarityCache.current[split[i]]) {
        const similarity = sentenceSimilarityCache.current[split[i]];
        sentences.push(colorBySimilarity(split[i], similarity));
      } else {
        sentences.push(split[i]);
      }
    }

    return sentences.join(".");
  }, [thoughts, thesis, sentenceSimilarityCache.current]);

  return (
    <ContentEditable
      html={maybeColoredThoughts}
      className="text-black bg-white w-full h-40"
      onChange={event => {
        setThoughts(event.currentTarget.textContent || "");
      }}
    />
  );
};

export default ContentEditableComponent;
