const { prefix, commandDelimiter, commandLimit } = require('../config');

const processCommand = (message, content) => {
  const botMentionPrefixRegExp = new RegExp(`^<@!?${message.client.user.id}>`);
  const noPrefix = !prefix || !content.startsWith(prefix);
  const noBotMentionPrefix = !botMentionPrefixRegExp.test(content);

  // ignore if not a command
  if (noPrefix && noBotMentionPrefix) {
    return;
  }

  // parse content into command and arguments
  const args = content
    .replace(noBotMentionPrefix ? prefix : botMentionPrefixRegExp, '')
    .split(' ')
    .filter(Boolean);
  let command = args.shift().toLowerCase();

  // ignore if command does not exist
  try {
    command = require(`../commands/${command}`);
  } catch {
    return;
  }

  // ignore if args is empty
  if (command.returnOnEmptyArgs && !args.length) {
    return;
  }

  console.log(
    (message.channel.type === 'text'
      ? `${message.guild.name}#${message.channel.name}|`
      : '') + `${message.author.tag}: ${content}`
  );

  return [() => command.run(message, args), command.deleteCommand];
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

  // if at least one config setting is bad, treat content as one command
  const contents =
    !commandDelimiter.length || !commandLimit.length || commandLimit <= 1
      ? [message.content]
      : message.content.split(commandDelimiter).slice(0, commandLimit);

  // process contents
  const responses = contents
    .map(content => processCommand(message, content))
    .filter(Boolean);

  // ignore if content had no commands
  if (!responses.length) {
    return;
  }

  // if at least one command asks to delete, delete it
  const deleteCommand = responses.some(response => response[1]);

  // send messages synchronously
  responses
    .map(response => response[0])
    .filter(Boolean)
    .reduce(
      (promiseChain, nextPromise) => promiseChain.then(nextPromise),
      Promise.resolve()
    )
    .then(() => {
      if (deleteCommand) {
        message.delete();
      }
    });
};
