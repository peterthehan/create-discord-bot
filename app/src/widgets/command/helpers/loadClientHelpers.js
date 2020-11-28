const { Client } = require("discord.js");

module.exports = () => {
  Client.prototype.getCommand = function (commandName) {
    return (
      this.commands.get(commandName) ||
      this.commands.find((command) => command.aliases.has(commandName))
    );
  };
};
