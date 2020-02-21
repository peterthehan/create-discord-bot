module.exports = {
  name: 'ping',
  aliases: ['p'],
  ownersOnly: true,
  guildOnly: false,
  requireArgs: false,
  deleteCommand: false,
  cooldown: Infinity,
  disabled: false,
  messageExecute: async (message, args) =>
    message.channel.send(`🏓 ${Math.round(message.client.ws.ping)} ms`)
};
