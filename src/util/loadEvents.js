const requireEvent = (event) => require(`../events/${event}`);

module.exports = (client) => {
  client.on('message', requireEvent('message'));
  client.on('ready', () => requireEvent('ready')(client));
  process.on('unhandledRejection', (error) => requireEvent('unhandledRejection')(error));
};
