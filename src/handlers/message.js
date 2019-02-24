const { commandDelimiter, commandLimit } = require('../config');
const getCommand = require('../util/getCommand');
const getPrefixRegExp = require('../util/getPrefixRegExp');
const hasPermission = require('../util/hasPermission');
const serializer = require('../util/serializer');
const startsWithPrefix = require('../util/startsWithPrefix');

const parseMessageContent = ({ content }) =>
  !commandDelimiter.length || !commandLimit.length || commandLimit <= 1
    ? [content]
    : content.split(commandDelimiter).slice(0, commandLimit);

const processCommand = ({ message, content }) => {
  let args = content.replace(getPrefixRegExp(message), '').split(' ');
  const command = getCommand(message, args.shift().toLowerCase());
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
  if (
    message.channel.type === 'text' &&
    hasPermission(message, 'MANAGE_MESSAGES') &&
    responses.some(r => r.deleteCommand)
  )
    message.delete();
};
