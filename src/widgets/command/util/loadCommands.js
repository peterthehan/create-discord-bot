const fs = require('fs');
const path = require('path');
const { Collection } = require('discord.js');

module.exports = client => {
  const commands = new Collection();

  fs.readdirSync(path.resolve(__dirname, '../commands'))
    .filter(file => file.endsWith('.js'))
    .forEach(file => {
      const command = require(`../commands/${file}`);
      commands.set(command.name, command);
    });

  client.commands = commands;
};
