import { CommandInteraction, SlashCommandBuilder,  } from "discord.js";
import { CCache, CIDCache, TIDCache } from "../ai/cache.js";

export default function(i: CommandInteraction) {
        const convoId = i.channel.isDMBased() ? CIDCache.get(i.user.id) : TIDCache.get(i.channel.id)

        if (!(i.channel.isThread() || i.channel.isDMBased()) || convoId == undefined) {
            return i.reply({
                "content":"You can only use this command in a session thread or DM!",
                "ephemeral": true
            })
        }

        CCache.delete(convoId)
        i.reply({
            "content": "Cleared conversation history!",
            "ephemeral": true
        })
}