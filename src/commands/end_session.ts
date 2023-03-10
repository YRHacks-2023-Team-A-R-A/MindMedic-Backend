import { CommandInteraction, SlashCommandBuilder,  } from "discord.js";
import { CCache, CIDCache, Sessions, TIDCache } from "../ai/cache.js";

export default function(i: CommandInteraction) {
        if (!Sessions.has(i.user.id)) {
            return i.reply({
                "content":"You don't currently have an active session! If you want to create one, use /start-session.",
            })
        }

        const convoId = CIDCache.get(i.user.id)

        CIDCache.forEach((id, user) => {
            if(id == convoId) {
                Sessions.delete(user)
                CIDCache.delete(user)
            }
        });

        if(i.channel.isThread()) {
            i.channel.setLocked(true)
            TIDCache.delete(i.channel.id)
        }

        // Stop listening to messages
        
        CCache.delete(convoId)

        i.reply({
            "content": "Ended your session. Hope I was able to help!",
        })
}