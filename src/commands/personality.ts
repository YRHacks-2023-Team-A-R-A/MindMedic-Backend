import { CommandInteraction, SlashCommandBuilder,  } from "discord.js";
import { CCache, CIDCache, Sessions, SPCache, TIDCache } from "../ai/cache.js";

export default function(i: CommandInteraction) {
        //@ts-ignore
       const subcommand = i.options.getSubcommand(false)
       const personality = i.options.get("personality").value

       const convoId = i.channel.isDMBased() ? CIDCache.get(i.user.id) : TIDCache.get(i.channel.id)

        if (!Sessions.has(i.user.id)) {
            return i.reply({
                content: "You do not currently have an active session, please start one to use this command"
            })
        }

        if (!(i.channel.isThread() || i.channel.isDMBased())) {
            return i.reply({
                "content":"You can only use this command in a session thread or DM!",
                "ephemeral": true
            })
        }

        if (convoId == undefined) {
            return i.reply({
                "content":"You can only use this command in a session thread!",
                "ephemeral": true
            })
        }

        if (subcommand == "set") {
           SPCache.set(convoId, personality as string)
           CCache.delete(convoId)
           i.reply({
            content: `Successfully set personality for current session to \`${personality}\`. The conversation history has been reset.`
           })
        }
}