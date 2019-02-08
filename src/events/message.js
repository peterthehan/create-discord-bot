const { prefix, commandDelimiter, commandLimit } = require('../config');

const processCommand = (message, content, isLastCommand) => {
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
    command = require(`../commands/${command}`);

    // ignore if args is empty
    if (command.returnOnEmptyArgs && !args.length) {
      return;
    }

    console.log(
      (message.channel.type === 'text'
        ? `${message.guild.name}#${message.channel.name}|`
        : '') + `${message.author.tag}: ${content}`
    );

    return command.run(message, args).then(() => {
      if (isLastCommand && command.deleteCommand) {
        message.delete();
      }
    });
  };
};

module.exports = message => {
  // ignore bot messages
  if (message.author.bot) {
    return;
  }

  // ignore non-guild text channel messages
  // if (message.channel.type !== 'text') {
  //   return;
  // }

  // if any of the conditions fail, treat the entire message as one command
  const contents =
    !commandDelimiter.length || !commandLimit.length || commandLimit <= 1
      ? [message.content]
      : message.content.split(commandDelimiter).slice(0, commandLimit);

  // process the contents synchronously
  contents
    .map((content, index) =>
      processCommand(message, content, index === contents.length - 1)
    )
    .reduce(
      (currentPromise, nextPromise) => currentPromise.then(nextPromise),
      Promise.resolve()
    );
};
