module.exports = {
  returnOnEmptyArgs: false,
  deleteCommand: false,
  run: message =>
    message.channel
      .send({ embed: { description: 'Pinging...' } })
      .then(newMessage => {
        newMessage.edit({
          embed: {
            title: 'Pong! 🏓',
            description: `${newMessage.createdTimestamp -
              message.createdTimestamp} ms`
          }
        });
      })
};
