import "dotenv/config";
import path from "path";
import { Intents } from "discord.js";
import { CoreClient } from "discord-bot-core-client";

const client = new CoreClient({
  token: process.env.DISCORD_BOT_TOKEN as string,
  clientOptions: {
    intents: [
      Intents.FLAGS.GUILDS,
      Intents.FLAGS.GUILD_MEMBERS,
      Intents.FLAGS.GUILD_INTEGRATIONS,
      Intents.FLAGS.GUILD_WEBHOOKS,
      Intents.FLAGS.GUILD_VOICE_STATES,
      Intents.FLAGS.GUILD_PRESENCES,
      Intents.FLAGS.GUILD_MESSAGES,
      Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    ],
  },
});

client.registerBotsIn(path.resolve(__dirname, "bots")).start();
