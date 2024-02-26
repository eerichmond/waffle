export const sizeBySimilarity = (str: string, similarity: number) => {
  const size = similarity * 40;
  return `<span style="font-size: ${size}px">${str}</span>`
}

export const getSimilarity = async (sentence1: string, sentence2: string) => {
  if (sentence1 === '' || sentence2 === '') {
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

  return response.json();
}

const randomAdjectives: string[] = [
  "adventurous",
  "brave",
  "charming",
  "delightful",
  "enthusiastic",
  "friendly",
  "graceful",
  "hopeful",
  "innovative",
  "joyful",
  "kind",
  "lively",
  "mysterious",
  "noble",
  "optimistic",
  "passionate",
  "quirky",
  "resilient",
  "spirited",
  "thoughtful",
  "unique",
  "vibrant",
  "witty",
  "exuberant",
  "youthful",
  "zealous",
  "ambitious",
  "bold",
  "creative",
  "daring",
  "energetic",
  "funny",
  "generous",
  "helpful",
  "intelligent",
  "jovial",
  "keen",
  "loving",
  "magnificent",
  "nurturing",
  "open-minded",
  "proud",
  "quick-witted",
  "reliable",
  "sincere",
  "trustworthy",
  "upbeat",
  "versatile",
  "wise",
  "zesty"
]

const randomNouns: string[] = [
  "apple",
  "butterfly",
  "castle",
  "dragon",
  "elephant",
  "forest",
  "galaxy",
  "harbor",
  "iceberg",
  "jungle",
  "knight",
  "lighthouse",
  "mountain",
  "nebula",
  "ocean",
  "penguin",
  "quartz",
  "rainbow",
  "sunflower",
  "tree",
  "universe",
  "volcano",
  "waterfall",
  "xenon",
  "yacht",
  "zeppelin",
  "acorn",
  "balloon",
  "compass",
  "diamond",
  "eclipse",
  "flamingo",
  "glacier",
  "horizon",
  "iris",
  "jigsaw",
  "kaleidoscope",
  "lantern",
  "meteor",
  "neptune",
  "origami",
  "pyramid",
  "quokka",
  "rose",
  "satellite",
  "tulip",
  "urchin",
  "vortex",
  "willow",
  "x-ray",
  "yarn",
  "zebra"
]

const capitalizeWord = (word: string) => {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export const generateRandomUsername = () => {
  const adjective = randomAdjectives[Math.floor(Math.random() * randomAdjectives.length)];
  const noun = randomNouns[Math.floor(Math.random() * randomNouns.length)];
  return `${capitalizeWord(adjective)}${capitalizeWord(noun)}`
}

