exports.run = (message, args) => {
  return message.channel
    .send({ embed: { description: 'Pinging...' } })
    .then(newMessage => {
      newMessage.edit({
        embed: {
          title: 'Pong! 🏓',
          description: `${newMessage.createdTimestamp -
            message.createdTimestamp} ms`
        }
      });
    });
};
