const { Guild } = require("discord.js");

module.exports = () => {
  Guild.prototype.getMessage = async function (messageId) {
    const filteredChannels = this.channels.cache
      .filter((channel) => channel.isTextChannel() && channel.viewable)
      .array();

    for (const channel of filteredChannels) {
      try {
        return await channel.messages.fetch(messageId);
        // eslint-disable-next-line no-empty
      } catch (error) {}
    }
  };
};
