const CommandBuilder = require("../classes/CommandBuilder");

module.exports = new CommandBuilder()
  .setName("ping")
  .setAliases(["p", "pong"])
  .setOwnersOnly(false)
  .setGuildOnly(false)
  .setRequireArgs(false)
  .setDeletable(false)
  .setCooldown(10)
  .setDisabled(false)
  .setMessageExecute(async (message, args) => {
    message.channel.send(`🏓 ${Math.round(message.client.ws.ping)} ms`);
  });
