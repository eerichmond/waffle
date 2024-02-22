import { v } from "convex/values";
import OpenAI from "openai";
import { query } from "./_generated/server";

export const get = query({
    args: { sentence: v.string() },
    handler: async (ctx, args) => {
        const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        })

        const embeddingsResponse = await openai.embeddings.create({
            input: ["test sentence"],
            model: 'text-embedding-ada-002',
        });

        const embeddings = [];
        for (const embedding of embeddingsResponse.data) {
            embeddings.push(embedding);
        };

        return embeddings;
    },
});

