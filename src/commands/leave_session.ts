import { CommandInteraction, SlashCommandBuilder,  } from "discord.js";
import { CCache, CIDCache, Sessions } from "../ai/cache.js";

export default function(i: CommandInteraction) {
        if (!Sessions.has(i.user.id)) {
            return i.reply({
                "content":"You don't currently have an active session! If you want to create one, use /start-session.",
            })
        }

        Sessions.delete(i.user.id)
        CIDCache.delete(i.user.id)

        i.reply({
            "content": "Left your session. Hope I was able to help!",
        })
}