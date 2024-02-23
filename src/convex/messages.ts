import { v } from "convex/values";
import OpenAI from "openai";

import { query, action, internalMutation } from "./_generated/server";
import { internal } from "./_generated/api";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const post = internalMutation({
    args: { message: v.string(), author: v.string(), embedding: v.array(v.number()) },
    handler: async (ctx, args) => {
        await ctx.db.insert('messages', {
            message: args.message,
            author: args.author,
            embedding: args.embedding,
        });
    },
});

export const writeMessage = action({
    args: { message: v.string(), author: v.string() },
    handler: async (ctx, args) => {
        const embeddingsResponse = await openai.embeddings.create({
            input: [args.message],
            model: 'text-embedding-3-small',
        });

        const embedding = embeddingsResponse.data[0].embedding;

        await ctx.runMutation(internal.messages.post, {
            message: args.message,
            author: args.author,
            embedding: embedding,
        })
    },
});

function cosineSimilarity(embedding1: number[], embedding2: number[]) {
    if (!embedding1.length) {
        return 1;
    }

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

export const getMessagesWithRelativeSimilarity = query({
    args: { username: v.string() },
    handler: async (ctx, args) => {
        const [recentMessage] = await ctx.db.query('messages')
            .filter((q) => q.eq(q.field("author"), args.username))
            .order("desc")
            .take(1);

        const allMessages = await ctx.db.query('messages').collect();

        return allMessages.map(({ _id, author, embedding, message }) => {
            const similarity = cosineSimilarity(recentMessage?.embedding ?? [], embedding);

            return { _id, author, message, similarity };
        });
    },
});
