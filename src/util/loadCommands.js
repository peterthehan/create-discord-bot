const fs = require('fs');
const { Collection } = require('discord.js');

module.exports = client => {
  const commands = new Collection();

  fs.readdirSync('./src/commands')
    .filter(file => file.endsWith('.js'))
    .forEach(file => {
      const command = require(`../commands/${file}`);
      commands.set(command.name, command);
    });

  client.commands = commands;
};
