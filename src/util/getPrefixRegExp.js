const { prefix } = require('../config');

module.exports = message =>
  new RegExp(
    `^(<@!?${message.client.user.id}>${!prefix ? '' : `|[${prefix}]`})\\s*`
  );
