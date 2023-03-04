import { ActivityType, Client, IntentsBitField, Partials, Routes, SlashCommandBuilder } from "discord.js";
import "dotenv/config"
import { Events } from "./events/mod.js"
import "./http/server.js"




// Load Env Variables

// Init client
const client = new Client({
    "intents": ["Guilds", "GuildMembers", "GuildMessages", "DirectMessages", "MessageContent"],
    "partials": [Partials.Channel],
    "presence": {
        "status": "online",
        "activities": [{"name": "to you", "type": ActivityType.Listening}]
    }
})

client.on("guildCreate", guild => {
    console.log(
      `New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`
    );
    message.channel.send("**Hi! Thanks for adding me to your server!** Say: ```/start-session``` to start a session, ```/add-user``` to add someone to it, ```/end-session``` to end it & ```/leave-session``` to leave a session you've been added to! **I can also be contacted through DM’s! **");
});

Object.keys(Events).forEach((event) => {
    client.on(event, Events[event])
})

client.login(process.env.TOKEN)

process.on('uncaughtException', function (err) {
    console.error(`Unexpected Error:`, err);
});