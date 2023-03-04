import { CommandInteraction, SlashCommandBuilder,  } from "discord.js";
import { CCache, CIDCache } from "../ai/cache.js";

export default function(i: CommandInteraction) {
        const convoId = CIDCache.get(i.user.id)

        CCache.delete(convoId)
        i.reply({
            "content": "Cleared conversation history!",
            "ephemeral": true
        })
}