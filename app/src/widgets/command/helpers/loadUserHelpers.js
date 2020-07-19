const { User } = require("discord.js");

module.exports = () => {
  const ownerIds = new Set(require("../config").ownerIds);

  User.prototype.isOwner = function () {
    return ownerIds.has(this.id);
  };

  User.prototype.isUser = function () {
    return !this.bot && !this.system;
  };
};
