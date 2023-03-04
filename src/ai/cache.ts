import { ChatCompletionRequestMessage } from "openai";

// Conversation cache
export const CCache = new Map<string, ChatCompletionRequestMessage[]>
