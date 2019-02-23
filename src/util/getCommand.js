module.exports = (message, command) =>
  message.client.commands.get(command) ||
  message.client.commands.find(
    cmd => cmd.aliases && cmd.aliases.includes(command)
  );
