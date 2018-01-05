exports.run = (message, args) => {
  let e = { description: 'Pinging...', };

  message.channel
    .send({ embed: e, })
    .then(newMessage => {
      e = {
        title: 'Pong! 🏓',
        description: `${newMessage.createdTimestamp - message.createdTimestamp} ms`,
      };

      newMessage.edit({ embed: e, });
    })
    .catch(error => console.log(error));
}
