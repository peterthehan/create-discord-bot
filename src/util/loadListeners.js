const handler = event => require(`../handlers/${event}`);

module.exports = client => {
  client.once('ready', () => handler('ready')(client));
  client.on('message', handler('message'));
  process.on('unhandledRejection', console.warn);
};
