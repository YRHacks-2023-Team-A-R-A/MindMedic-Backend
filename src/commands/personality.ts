import { CommandInteraction, SlashCommandBuilder,  } from "discord.js";
import { CCache, CIDCache, Sessions, SPCache } from "../ai/cache.js";

export default function(i: CommandInteraction) {
        //@ts-ignore
       const subcommand = i.options.getSubcommand(false)
       const personality = i.options.get("personality").value

       const convoId = CIDCache.get(i.user.id)

        if (!Sessions.has(i.user.id)) {
            return i.reply({
                content: "You do not currently have an active session, please start one to use this command"
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