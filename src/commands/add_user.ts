import { AnyThreadChannel, CommandInteraction, SlashCommandBuilder,  } from "discord.js";
import { CCache, CIDCache, Sessions, SPCache, TIDCache } from "../ai/cache.js";

export default function(i: CommandInteraction) {

        const targetId = (i.options.get("user").value) as string

        if (!Sessions.has(i.user.id)) {
            return i.reply({
                "content":"You don't have an active session to add this user to!",
            })
        }

        if (Sessions.has(targetId)) {
            return i.reply({
                "content":"This user already has an active session!",
            })
        }

        if (!(i.channel.isThread())) {
            return i.reply({
                "content":"You can only use this command in a session thread!",
                "ephemeral": true
            })
        } else {
            const convoId = TIDCache.get(i.channel.id)

            if (convoId == undefined) {
                return i.reply({
                    "content":"You can only use this command in a session thread!",
                    "ephemeral": true
                })
            }

            // Start listening to messages
            Sessions.add(targetId)
            CIDCache.set(targetId, convoId)
            
            i.channel.members.add(targetId)

            i.reply({
                "content": `Added <@${targetId}> to the session! MindMedic will now start listening to their messages!`,
            })
        }
}