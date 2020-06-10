const CommandBuilder = require("../classes/CommandBuilder");

module.exports = new CommandBuilder()
  .name("ping")
  .aliases(["p", "pong"])
  .ownersOnly(false)
  .guildOnly(false)
  .requireArgs(false)
  .deletable(false)
  .cooldown(10)
  .disabled(false)
  .messageExecute(async (message, args) => {
    message.channel.send(`🏓 ${Math.round(message.client.ws.ping)} ms`);
  })
  .build();
