import { CommandInteraction, SlashCommandBuilder,  } from "discord.js";
import { CCache, CIDCache, Sessions, SPCache } from "../ai/cache.js";

export default function(i: CommandInteraction) {
        if (Sessions.has(i.user.id)) {
            return i.reply({
                "content":"You already have an active session! If you want to end it, please use /end-session.",
            })
        }

        // Start listening to messages

        const convoId = (Math.random() * 100).toString(16)

        console.log("cid:", convoId)

        Sessions.add(i.user.id)
        CIDCache.set(i.user.id, convoId)
        SPCache.set(convoId, "Therapist")

        i.reply({
            "content": "Started a new session! MindMedic will now start listening to your messages.",
        })
}