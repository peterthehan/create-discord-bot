module.exports = (message, flag) =>
  message.channel.permissionsFor(message.client.user.id).has(flag);
