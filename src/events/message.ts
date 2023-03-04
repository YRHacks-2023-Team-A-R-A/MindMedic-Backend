import { CategoryChannel, Channel, Events, ForumChannel, Message, PartialGroupDMChannel, StageChannel } from "discord.js"
import { CIDCache, Sessions, TIDCache } from "../ai/cache.js"
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

    if (message.channel.isThread() || message.channel.isDMBased()) {
        let convoId = message.channel.isDMBased() ? CIDCache.get(message.author.id) : TIDCache.get(message.channel.id)

        if (convoId == undefined) return

        completeConversation(message.author.username, message.author.id, message.content).then((response) => {
            message.reply(response)
        })
        message.channel.sendTyping()
    }
}