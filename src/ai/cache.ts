import { ChatCompletionRequestMessage } from "openai";

// Conversation cache
export const CIDCache = new Map<string, string>();
export const CCache = new Map<string, ChatCompletionRequestMessage[]>();

// Active user sessions
export const Sessions = new Set<string>();

// (per-session) Personality Cache
export const SPCache = new Map<string, string>();