const getBotMentionPrefixRegExp = require('./getBotMentionPrefixRegExp');

module.exports = (message, content) =>
  getBotMentionPrefixRegExp(message).test(content);
