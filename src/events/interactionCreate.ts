import { Interaction } from "discord.js";
import { Commands } from "../commands/mod.js";

export default function(i: Interaction) {
    if (!i.isCommand()) return

    Commands[i.commandName]?.(i)
}