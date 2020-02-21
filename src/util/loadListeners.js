const { events } = require('../config');

const handler = event => require(`../handlers/${event}`);

module.exports = client => {
  process.on('unhandledRejection', console.warn);
  client.once('ready', () => handler('ready')(client));
  events.forEach(event => client.on(event, handler(event)));
};
