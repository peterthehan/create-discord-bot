module.exports = {
  name: 'ping',
  aliases: ['p', 'pong'],
  ownersOnly: true,
  guildOnly: false,
  removeFalsyArgs: false,
  requireArgs: false,
  deleteCommand: false,
  run: async (message, args) =>
    message.channel.send(`🏓 ${Math.round(message.client.ws.ping)} ms`)
};
