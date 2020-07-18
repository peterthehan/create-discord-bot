const fs = require("fs");
const path = require("path");
const { Collection } = require("discord.js");

const getCommands = () => {
  const commands = new Collection();
  fs.readdirSync(path.resolve(__dirname, "../commands"))
    .filter((file) => file.endsWith(".js"))
    .forEach((file) => {
      const command = require(`../commands/${file}`).build();
      commands.set(command.name, command);
    });

  return commands;
};

module.exports = (client) => {
  client.commands = getCommands();
};
