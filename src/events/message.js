const { prefix, commandDelimiter, commandLimit } = require('../config');

const processCommand = (message, content) => {
  // ignore bot messages
  if (message.author.bot) {
    return;
  }

  // ignore non-guild text channel messages
  // if (message.channel.type !== 'text') {
  //   return;
  // }

  const botMentionPrefixRegExp = new RegExp(`^<@!?${message.client.user.id}>`);
  const noPrefix = !prefix || !content.startsWith(prefix);
  const noBotMentionPrefix = !botMentionPrefixRegExp.test(content);

  // ignore if not a command
  if (noPrefix && noBotMentionPrefix) {
    return;
  }

  // parse message into command and arguments
  let args;
  let command;
  if (noBotMentionPrefix) {
    args = content.split(' ').filter(Boolean);
    command = args
      .shift()
      .slice(prefix.length)
      .toLowerCase();
  } else {
    args = content
      .replace(botMentionPrefixRegExp, '')
      .split(' ')
      .filter(Boolean);
    command = args.shift().toLowerCase();
  }

  return () => {
    console.log(
      (message.channel.type === 'text'
        ? `${message.guild.name}#${message.channel.name}|`
        : '') + `${message.author.tag}: ${content}`
    );
    return require(`../commands/${command}`).run(message, args);
  };
};

module.exports = message => {
  message.content
    .split(commandDelimiter)
    .slice(0, commandLimit)
    .map(content => processCommand(message, content))
    .reduce(
      (currentPromise, nextPromise) => currentPromise.then(nextPromise),
      Promise.resolve()
    );
};
