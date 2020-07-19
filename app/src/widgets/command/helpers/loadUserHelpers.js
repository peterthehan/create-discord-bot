const { User } = require("discord.js");
const CooldownCache = require("../classes/CooldownCache");

module.exports = () => {
  const ownerIds = new Set(require("../config").ownerIds);

  User.prototype.isOwner = function () {
    return ownerIds.has(this.id);
  };

  User.prototype.isUser = function () {
    return !this.bot && !this.system;
  };

  User.prototype.isOnCooldown = function (command) {
    return CooldownCache.isOnCooldown(this, command);
  };

  User.prototype.startCooldown = function (command) {
    return CooldownCache.startCooldown(this, command);
  };
};
