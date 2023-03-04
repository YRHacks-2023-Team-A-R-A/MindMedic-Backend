import { Events, Message } from "discord.js"
import { completeConversation } from "../ai/openai.js"



export default function(message: Message): void {
    if (message.author.bot) return
    // Only allow dms
    if (message.inGuild()) return

    console.log(`got: ${message.content}`)

    completeConversation(message.author.id, message.content).then((response) => {
        message.reply(response)
    })    
}