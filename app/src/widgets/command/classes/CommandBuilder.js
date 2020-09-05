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
    // eslint-disable-next-line
    this.execute = async () => {};
  }

  setName(name) {
    this.name = name;
    return this;
  }

  setAliases(aliases) {
    this.aliases = aliases;
    return this;
  }

  setOwnersOnly(ownersOnly) {
    this.ownersOnly = ownersOnly;
    return this;
  }

  setGuildOnly(guildOnly) {
    this.guildOnly = guildOnly;
    return this;
  }

  setRequireArgs(requireArgs) {
    this.requireArgs = requireArgs;
    return this;
  }

  setDeletable(deletable) {
    this.deletable = deletable;
    return this;
  }

  setCooldown(cooldown) {
    this.cooldown = cooldown;
    return this;
  }

  setDisabled(disabled) {
    this.disabled = disabled;
    return this;
  }

  setExecute(execute) {
    this.execute = execute;
    return this;
  }

  build() {
    return {
      name: this.name,
      aliases: new Set(this.aliases),
      ownersOnly: this.ownersOnly,
      guildOnly: this.guildOnly,
      requireArgs: this.requireArgs,
      deletable: this.deletable,
      cooldown: this.cooldown,
      disabled: this.disabled,
      execute: this.execute,
    };
  }
};
