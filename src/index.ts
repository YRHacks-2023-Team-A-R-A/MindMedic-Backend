import { ActivityType, Client, IntentsBitField, Partials } from "discord.js";
import "dotenv/config"
import { readdirSync } from "fs"
import { completeConversation } from "./ai/openai.js";

import { Events } from "./events/mod.js"


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

client.on("shardReady", () => {
    console.log("test")
})




client.login(process.env.TOKEN)