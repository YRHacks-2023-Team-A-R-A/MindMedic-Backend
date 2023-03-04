import { CommandInteraction, SlashCommandBuilder,  } from "discord.js";
import { CCache, Sessions } from "../ai/cache.js";

export default function(i: CommandInteraction) {
        if (Sessions.has(i.user.id)) {
            return i.reply({
                "content":"You already have an active session! If you want to end it, please use /end-session.",
            })
        }

        // Start listening to messages
        Sessions.add(i.user.id)

        i.reply({
            "content": "Started a new session! MindMedic will now start listening to your messages.",
        })
}