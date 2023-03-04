import { CommandInteraction, SlashCommandBuilder,  } from "discord.js";
import { CCache, CIDCache, Sessions, TIDCache } from "../ai/cache.js";

export default function(i: CommandInteraction) {
        if (!Sessions.has(i.user.id)) {
            return i.reply({
                "content":"You don't currently have an active session! If you want to create one, use /start-session.",
            })
        }

        if (!(i.channel.isThread())) {
            return i.reply({
                "content":"You can only use this command in a session thread!",
                "ephemeral": true
            })
        }

        const convoId = TIDCache.get(i.channel.id)

        if (convoId == undefined) {
            return i.reply({
                "content":"You can only use this command in a session thread!",
                "ephemeral": true
            })
        }

        i.channel.members.remove(i.user.id)
        Sessions.delete(i.user.id)
        CIDCache.delete(i.user.id)
        

        i.reply({
            "content": "Left your session. Hope I was able to help!",
        })
}