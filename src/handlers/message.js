const { prefix, commandDelimiter, commandLimit } = require('../config');
const getBotMentionPrefixRegExp = require('../util/getBotMentionPrefixRegExp');
const serializer = require('../util/serializer');
const startsWithBotMention = require('../util/startsWithBotMention');
const startsWithPrefix = require('../util/startsWithPrefix');

const parseMessageContent = ({ content }) =>
  !commandDelimiter.length || !commandLimit.length || commandLimit <= 1
    ? [content]
    : content.split(commandDelimiter).slice(0, commandLimit);

const processCommand = ({ message, content }) => {
  let args = content
    .replace(
      startsWithBotMention(message, content)
        ? getBotMentionPrefixRegExp(message)
        : prefix,
      ''
    )
    .trim()
    .split(' ');
  let command = args.shift().toLowerCase();

  command =
    message.client.commands.get(command) ||
    message.client.commands.find(
      cmd => cmd.aliases && cmd.aliases.includes(command)
    );

  if (!command) return;

  console.log(
    (message.channel.type === 'text'
      ? `${message.guild.name}#${message.channel.name}|`
      : '') + `${message.author.tag}: ${content}`
  );

  return {
    fn: () => {
      if (command.guildOnly && message.channel.type !== 'text') return;
      if (command.removeFalsyArgs) args = args.filter(Boolean);
      if (command.requireArgs && !args.length) return;

      return command.run(message, args);
    },
    deleteCommand: command.deleteCommand
  };
};

module.exports = async message => {
  if (message.author.bot) return;

  const responses = parseMessageContent(message)
    .map(content => ({ message, content }))
    .filter(startsWithPrefix)
    .map(processCommand)
    .filter(Boolean);
  if (!responses.length) return;

  await serializer(responses.map(r => r.fn));
  if (message.channel.type === 'text' && responses.some(r => r.deleteCommand))
    message.delete();
};
