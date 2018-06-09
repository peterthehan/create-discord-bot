const config = require('../config.json');

module.exports = (message) => {
  // uncomment for self bot
  // if (message.author.id !== message.client.user.id) {
  //   return;
  // }

  // ignore bot messages and messages not from guild text channels
  if (message.author.bot || message.channel.type !== 'text') {
    return;
  }

  const mentionRegExp = RegExp(`^<@!?${message.client.user.id}>`);
  const noPrefix = !config.prefix || !message.content.startsWith(config.prefix);
  const noMention = !mentionRegExp.test(message.content);

  // ignore if not a command
  if (noPrefix && noMention) {
    return;
  }

  // parse message into command and arguments
  let args;
  let command;
  if (noMention) {
    args = message.content.split(' ');
    command = args.shift().slice(config.prefix.length).toLowerCase();
  } else {
    args = message.content.replace(mentionRegExp, '').trim().split(' ');
    command = args.shift().toLowerCase();
  }

  // check if command file exists
  try {
    console.log(`${message.guild.name}#${message.channel.name}|${message.author.tag}: ${message.content}`);
    require(`../commands/${command}`).run(message, args);
  } catch (error) {
    console.log(error);
  }
}
