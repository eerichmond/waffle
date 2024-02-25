import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  messages: defineTable({
    author: v.string(),
    embedding: v.array(v.float64()),
    message: v.string(),
    name: v.string(),
  }),
});