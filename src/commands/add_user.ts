import { CommandInteraction, SlashCommandBuilder,  } from "discord.js";
import { CCache, CIDCache, Sessions, SPCache } from "../ai/cache.js";

export default function(i: CommandInteraction) {

        const targetId = (i.options.get("user").value) as string

        if (Sessions.has(targetId)) {
            return i.reply({
                "content":"This user already has an active session!",
            })
        }

        // Start listening to messages

        const convoId = CIDCache.get(i.user.id)

        Sessions.add(targetId)
        CIDCache.set(targetId, convoId)

        i.reply({
            "content": `Added <@${targetId}> to the session! MindMedic will now start listening to their messages!`,
        })
}