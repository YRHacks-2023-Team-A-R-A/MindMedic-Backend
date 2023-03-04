import { CommandInteraction, SlashCommandBuilder,  } from "discord.js";
import { CCache } from "../ai/cache.js";

export default function(i: CommandInteraction) {
        CCache.delete(i.user.id)
        i.reply({
            "content": "Cleared your conversation history!",
            "ephemeral": true
        })
}