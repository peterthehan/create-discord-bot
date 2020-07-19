const { Message } = require("discord.js");
const Executable = require("../classes/Executable");

module.exports = () => {
  Message.prototype.isFromTextChannel = function () {
    return this.channel.type === "text";
  };

  Message.prototype.isUserMessage = function () {
    return !this.system;
  };

  Message.prototype.isCommand = function () {
    return this.client.prefixRegExp.test(this.content);
  };

  Message.prototype.getCommand = function (commandString) {
    return (
      this.client.commands.get(commandString) ||
      this.client.commands.find((command) => command.aliases.has(commandString))
    );
  };

  Message.prototype.createExecutable = function () {
    const args = this.content.replace(this.client.prefixRegExp, "").split(/ +/);
    const commandString = args.shift().toLowerCase();
    const command = this.getCommand(commandString);

    return new Executable(this, this.author, command, args);
  };
};
