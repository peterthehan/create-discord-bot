const CooldownCache = require("./CooldownCache");
const isOwner = require("../util/isOwner");
const log = require("../util/log");

module.exports = class Executable {
  constructor(message, command, args) {
    this.message = message;
    this.command = command;
    this.args = args;
  }

  isExecutable() {
    return (
      this.command &&
      (!this.command.ownersOnly || isOwner(this.message.author)) &&
      (!this.command.guildOnly || this.message.channel.type === "text") &&
      (!this.command.requireArgs || this.args.length) &&
      !this.command.disabled &&
      !CooldownCache.isInCooldown(this.message.author, this.command)
    );
  }

  async execute() {
    log(this.message);
    CooldownCache.setCooldown(this.message.author, this.command);
    return this.command.messageExecute(this.message, this.args);
  }

  isDeletable() {
    return this.command.deletable && this.message.deletable;
  }
};
