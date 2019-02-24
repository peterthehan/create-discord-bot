const getPrefixRegExp = require('./getPrefixRegExp');

module.exports = ({ message, content }) =>
  getPrefixRegExp(message).test(content);
