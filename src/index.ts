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

Object.keys(Events).forEach((event) => {
    client.on(event, Events[event])
})

client.login(process.env.TOKEN)

process.on('uncaughtException', function (err) {
    console.error(`Unexpected Error:`, err);
});