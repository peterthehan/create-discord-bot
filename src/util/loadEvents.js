const requireEvent = event => require(`../events/${event}`);

module.exports = client => {
  client.on('ready', () => requireEvent('ready')(client));
  client.on('message', requireEvent('message'));
  process.on('unhandledRejection', error =>
    requireEvent('unhandledRejection')(error)
  );
};
