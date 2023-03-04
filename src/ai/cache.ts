import { ChatCompletionRequestMessage } from "openai";

// Conversation cache
export const CCache = new Map<string, ChatCompletionRequestMessage[]>();

// Active user sessions
export const Sessions = new Set<string>();