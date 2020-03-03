module.exports = {
  name: 'ping',
  aliases: ['p', 'pong'],
  ownersOnly: false,
  guildOnly: false,
  requireArgs: false,
  deleteCommand: false,
  cooldown: 10,
  disabled: false,
  messageExecute: async (message, args) =>
    message.channel.send(`🏓 ${Math.round(message.client.ws.ping)} ms`)
};
