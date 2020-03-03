module.exports = (message, commandIdentifier) =>
  message.client.commands.get(commandIdentifier) ||
  message.client.commands.find(command =>
    command.aliases.includes(commandIdentifier)
  );
