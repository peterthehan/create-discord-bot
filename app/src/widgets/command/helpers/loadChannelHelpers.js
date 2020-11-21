const { Channel } = require("discord.js");

module.exports = () => {
  Channel.prototype.isTextChannel = function () {
    return this.type === "text";
  };
};
