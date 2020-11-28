const fs = require("fs");
const path = require("path");
const { Collection } = require("discord.js");

module.exports = (client) => {
  const commands = new Collection();
  fs.readdirSync(path.resolve(__dirname, "../commands"))
    .map((filename) => filename.split(".").slice(0, -1).join("."))
    .forEach((filename) => {
      const command = require(`../commands/${filename}`)
        .setName(filename)
        .build();
      commands.set(command.name, command);
    });

  client.commands = commands;
};
