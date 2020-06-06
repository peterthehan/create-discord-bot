const { owners } = require("../config");
const { addCooldown, isInCooldownCache } = require("../caches/cooldownCache");
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
      (!this.command.ownersOnly || owners.includes(this.message.author.id)) &&
      (!this.command.guildOnly || this.message.channel.type === "text") &&
      (!this.command.requireArgs || this.args.length) &&
      !this.command.disabled &&
      !isInCooldownCache(this.message.author, this.command)
    );
  }

  async execute() {
    log(this.message);
    addCooldown(this.message.author, this.command);
    return this.command.messageExecute(this.message, this.args);
  }

  isDeletable() {
    return this.command.deletable && this.message.deletable;
  }
};
