import OpenAI from "openai";


export async function POST(req, res) {
    const { sentence } = req.body;
    console.log("sentence", sentence);
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    })
    
    /*const embeddingsResponse = await openai.embeddings.create({
        input: ["test sentence"],
        model: 'text-embedding-ada-002',
    });
    
    const embeddings = [];
    for (const embedding of embeddingsResponse.data) {
        embeddings.push(embedding);
    }

    return new Response(JSON.stringify(embeddings), {
        status: 200,
    });
    */
   const result = "test result"
    return new Response(JSON.stringify(result), {
     status: 200,   
    });
}



