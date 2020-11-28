const { Message } = require("discord.js");
const Executable = require("../classes/Executable");

module.exports = () => {
  Message.prototype.isFromTextChannel = function () {
    return this.channel.isTextChannel();
  };

  Message.prototype.isUserMessage = function () {
    return !this.system && this.author && this.author.isUser();
  };

  Message.prototype.isCommand = function () {
    return this.client.prefixRegExp.test(this.content);
  };

  Message.prototype.createExecutable = function () {
    const args = this.content.replace(this.client.prefixRegExp, "").split(/ +/);
    const commandName = args.shift().toLowerCase();
    const command = this.client.getCommand(commandName);

    return new Executable(this, this.author, command, args);
  };
};
