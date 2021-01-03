require("dotenv").config();
const { Client } = require("discord.js");

const client = new Client();

require("./core/loadWidgetListeners")(client);

client.login(process.env.DISCORD_BOT_TOKEN);
