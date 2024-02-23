import { v } from "convex/values";
import OpenAI from "openai";
import { query } from "./_generated/server";

export const get = query({
    args: {},
    handler: async (ctx) => {
        const users = await ctx.db.query('users').collect();
        console.log("🚀 ~ handler: ~ users:", users)

        return users;
    },
});

