import { Events, Message } from "discord.js"
import { Sessions } from "../ai/cache.js"
import { completeConversation } from "../ai/openai.js"



export default function(message: Message): void {
    if (message.author.bot) return
    // Only watch users with active sessions
    if (!Sessions.has(message.author.id)) {
        if (!message.inGuild()) {
            message.reply("You do not currently have an active session, if you wish to start one please use the /start-session command.")
        }

        return
    }

    console.log(`got: ${message.content}`)

    completeConversation(message.author.username, message.author.id, message.content).then((response) => {
        message.reply(response)
    })    
}