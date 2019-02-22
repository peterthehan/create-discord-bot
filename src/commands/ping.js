module.exports = {
  name: 'ping',
  aliases: ['p'],
  guildOnly: false,
  removeFalsyArgs: false,
  requireArgs: false,
  deleteCommand: false,
  run: async message => {
    const newMessage = await message.channel.send({
      embed: { description: 'Pinging...' }
    });

    return newMessage.edit({
      embed: {
        title: 'Pong! 🏓',
        description: `${newMessage.createdTimestamp -
          message.createdTimestamp} ms`
      }
    });
  }
};
