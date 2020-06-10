module.exports = class CommandBuilder {
  constructor() {
    this.name = "";
    this.aliases = [];
    this.ownersOnly = true;
    this.guildOnly = true;
    this.requireArgs = true;
    this.deletable = false;
    this.cooldown = Infinity;
    this.disabled = true;
    this.messageExecute = async () => {};
  }

  name(name) {
    this.name = name;
    return this;
  }

  aliases(aliases) {
    this.aliases = aliases;
    return this;
  }

  ownersOnly(ownersOnly) {
    this.ownersOnly = ownersOnly;
    return this;
  }

  guildOnly(guildOnly) {
    this.guildOnly = guildOnly;
    return this;
  }

  requireArgs(requireArgs) {
    this.requireArgs = requireArgs;
    return this;
  }

  deletable(deletable) {
    this.deletable = deletable;
    return this;
  }

  cooldown(cooldown) {
    this.cooldown = cooldown;
    return this;
  }

  disabled(disabled) {
    this.disabled = disabled;
    return this;
  }

  messageExecute(messageExecute) {
    this.messageExecute = messageExecute;
    return this;
  }

  build() {
    return {
      name: this.name,
      aliases: this.aliases,
      ownersOnly: this.ownersOnly,
      guildOnly: this.guildOnly,
      requireArgs: this.requireArgs,
      deletable: this.deletable,
      cooldown: this.cooldown,
      disabled: this.disabled,
      messageExecute: this.messageExecute,
    };
  }
};
