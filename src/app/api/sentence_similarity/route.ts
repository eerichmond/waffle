import OpenAI from "openai";


function cosineSimilarity(embedding1, embedding2) {
    let dotProduct = 0;
    let magnitude1 = 0;
    let magnitude2 = 0;
    for (let i = 0; i < embedding1.length; i++) {
        dotProduct += embedding1[i] * embedding2[i];
        magnitude1 += embedding1[i] * embedding1[i];
        magnitude2 += embedding2[i] * embedding2[i];
    }
    magnitude1 = Math.sqrt(magnitude1);
    magnitude2 = Math.sqrt(magnitude2);

    return dotProduct / (magnitude1 * magnitude2);
}

export async function POST(req, res) {
    const {sentence1, sentence2} = await req.json();
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    })

    const embeddingsResponse = await openai.embeddings.create({
        input: [sentence1, sentence2],
        model: 'text-embedding-3-small',
    });

    const embeddings = [];
    for (const embedding of embeddingsResponse.data) {
        embeddings.push(embedding.embedding);
    }

    // Compute the cosine similarity between the two sentences
    const similarity = cosineSimilarity(embeddings[0], embeddings[1]);

    return new Response(JSON.stringify(similarity), {
        status: 200,
    });
}

