import { v } from "convex/values";
import OpenAI from "openai";
import { query } from "./_generated/server";

export const get = query({
    args: { sentence: v.string() },
    handler: async (ctx, args) => {
        const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });

        const result = "test result"

        return [args.sentence, result];
    },
});