const CooldownCache = require("./CooldownCache");
const isOwner = require("../util/isOwner");

module.exports = class Executable {
  constructor(message, user, command, args) {
    this.message = message;
    this.user = user;
    this.command = command;
    this.args = args;
  }

  log() {
    const logMessage = [
      ...(this.message.channel.type === "text"
        ? [this.message.guild, `#${this.message.channel.name}`]
        : ["DM"]),
      `${this.user.tag}: ${this.message.content}`,
    ];

    console.log(logMessage.join(" | "));
  }

  isExecutable() {
    return (
      this.command &&
      (!this.command.ownersOnly || isOwner(this.user)) &&
      (!this.command.guildOnly || this.message.channel.type === "text") &&
      (!this.command.requireArgs || this.args.length) &&
      !this.command.disabled &&
      !CooldownCache.isInCooldown(this.user, this.command)
    );
  }

  async execute() {
    this.log();
    CooldownCache.setCooldown(this.user, this.command);
    return this.command.execute(this.message, this.user, this.args);
  }

  isDeletable() {
    return this.command.deletable && this.message.deletable;
  }
};
