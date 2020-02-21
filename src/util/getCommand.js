module.exports = (message, commandIdentifier) =>
  message.client.commands.get(commandIdentifier) ||
  message.client.commands.find(cmd => cmd.aliases.includes(commandIdentifier));
