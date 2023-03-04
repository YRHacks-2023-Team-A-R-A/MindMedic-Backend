import { ChannelType, CommandInteraction, DMChannel, SlashCommandBuilder, StageChannel, TextChannel,  } from "discord.js";
import { CCache, CIDCache, Sessions, SPCache, TIDCache } from "../ai/cache.js";
import message from "../events/message.js";

export default function(i: CommandInteraction) {
        if (Sessions.has(i.user.id)) {
            return i.reply({
                "content":`You already have an active session! If you want to end it, please use /end-session.`,
            })
        }

       
        const convoId = (Math.random() * 100).toString(16)

         // Start listening to messages
        

        if(i.channel instanceof TextChannel) {
            i.channel.threads.create({
                name:`MindMedic Support - ${i.user.tag}`,
                type: ChannelType.PrivateThread
            }).then((thread) => {
                thread.send(`Started a new session! MindMedic will now start listening to your messages in this thread.\n<@${i.user.id}>`)
                i.reply(`<#${thread.id}>`)

                TIDCache.set(thread.id, convoId)
            })

            Sessions.add(i.user.id)
            CIDCache.set(i.user.id, convoId)
            SPCache.set(convoId, "Therapist")
            
        } else if (i.channel instanceof DMChannel) {
            Sessions.add(i.user.id)
            CIDCache.set(i.user.id, convoId)
            SPCache.set(convoId, "Therapist")

            return i.reply({
                "content": "Started a new session! MindMedic will now start listening to your messages.",
            })
        } else {
            return i.reply({
                "content": "You can only start sessions in text channels or DMs.",
            })
        }

        
}