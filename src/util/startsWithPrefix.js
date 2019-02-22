const { prefix } = require('../config');
const startsWithBotMention = require('./startsWithBotMention');

module.exports = ({ message, content }) =>
  (Boolean(prefix) && content.startsWith(prefix)) ||
  startsWithBotMention(message, content);
