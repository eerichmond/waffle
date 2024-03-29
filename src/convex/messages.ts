import { v } from "convex/values";
import OpenAI from "openai";

import { query, action, internalMutation, internalQuery, internalAction } from "./_generated/server";
import { internal } from "./_generated/api";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const insertMessage = internalMutation({
    args: { message: v.string(), author: v.string(), embedding: v.array(v.number()), name: v.string() },
    handler: async (ctx, args) => {
        await ctx.db.insert('messages', {
            message: args.message,
            author: args.author,
            name: args.name,
            embedding: args.embedding,
        });
    },
});

export const getMostRecent = internalQuery({
    args: { userId: v.string() },
    handler: async (ctx, args) => {
        return await ctx.db.query('messages')
            .filter((q) => q.eq(q.field("author"), args.userId))
            .order("desc")
            .take(1);
    },
});

function addEmbeddings(
    embeddingAndWeight1: [number[], number],
    embeddingAndWeight2: [number[], number]
): number[] {
    const [embedding1, weight1] = embeddingAndWeight1;
    const [embedding2, weight2] = embeddingAndWeight2;

    return embedding1.map((value, index) => {
        return value * weight1 + embedding2[index] * weight2;
    });
}

async function embed(message: string, dims:number=128) {
    const embeddingsResponse = await openai.embeddings.create({
        input: [message],
        model: 'text-embedding-3-small',
        dimensions: dims
    });

    return embeddingsResponse.data[0].embedding;
}

const PREV_MESSAGE_WEIGHT = 0.2;

export const writeMessage = action({
    args: { message: v.string(), author: v.string(), name: v.string() },
    handler: async (ctx, args) => {
        // await ctx.runAction(internal.messages.reCalculateAllMessageEmbeddings);
        const time1 = Date.now();
        let embedding = await embed(args.message);
        const time2 = Date.now();
        console.log(`Embedding took: ${time2 - time1}ms`);

        const [recentMessage] = await ctx.runQuery(internal.messages.getMostRecent,
            { userId: args.author })

        if (recentMessage) {
            const previousEmbedding = recentMessage.embedding;
            embedding = addEmbeddings(
                [previousEmbedding, PREV_MESSAGE_WEIGHT],
                [embedding, 1 - PREV_MESSAGE_WEIGHT]
            );
        }

        await ctx.runMutation(internal.messages.insertMessage, {
            message: args.message,
            author: args.author,
            name: args.name,
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
    args: { userId: v.string() },
    handler: async (ctx, args) => {
        const [recentMessage] = await ctx.db.query('messages')
            .filter((q) => q.eq(q.field("author"), args.userId))
            .order("desc")
            .take(1);

        const allMessages = await ctx.db.query('messages').collect();

        const messagesWithSimilarity = allMessages.map((message) => {

            const similarity = recentMessage?.embedding ?
                cosineSimilarity(recentMessage.embedding, message.embedding)
                : 1;
            return {
                name: message.name as string,
                message: message.message as string,
                similarity
            }
        });

        return messagesWithSimilarity;
    },
});


export const getAllMessages = internalQuery({
    handler: async (ctx) => {
        return await ctx.db.query('messages').collect();
    }
});

export const editMessageEmbedding = internalMutation({
    args: { id: v.id("messages"), embedding: v.array(v.number()) },
    handler: async (ctx, args) => {
        await ctx.db.patch(args.id, {
            embedding: args.embedding
        });
    }
});

export const reCalculateAllMessageEmbeddings = internalAction({
    args: {},
    handler: async (ctx, args) => {
        const allMessages = await ctx.runQuery(internal.messages.getAllMessages);
        for (const message of allMessages) {
            console.log(`Embedding: ${message.message}`);
            const embedding = await embed(message.message);
            await ctx.runMutation(internal.messages.editMessageEmbedding, {
                id: message._id,
                embedding
            });
        }
    }
});