module.exports = message => new RegExp(`^<@!?${message.client.user.id}>`);
