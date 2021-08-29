import { Client } from "discord.js";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
module.exports = async (client: Client): Promise<void> => {
  console.log(__dirname.split("\\").slice(-2)[0]);
};
