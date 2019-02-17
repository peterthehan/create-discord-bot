const requireEvent = event => require(`../events/${event}`);

module.exports = client => {
  client.once('ready', () => requireEvent('ready')(client));
  client.on('message', requireEvent('message'));
  process.on('unhandledRejection', requireEvent('unhandledRejection'));
};
