const {
  prefixes,
  commandDelimiter,
  commandLimit,
  owners
} = require('../config');
const { addCooldown, isInCooldownCache } = require('../caches/cooldownCache');
const getCommand = require('../util/getCommand');
const hasPermission = require('../util/hasPermission');
const isText = require('../util/isText');
const serializer = require('../util/serializer');

const getPrefixRegExp = message =>
  new RegExp(
    !prefixes.length
      ? `^<@!?${message.client.user.id}>\\s*`
      : `^(<@!?${message.client.user.id}>|(${prefixes.join('|')}))\\s*`
  );

const parseMessage = ({ content }) =>
  !commandDelimiter || !commandLimit || commandLimit <= 1
    ? [content]
    : content.split(commandDelimiter).slice(0, commandLimit);

const startsWithPrefix = ({ message, content }) =>
  getPrefixRegExp(message).test(content);

const parseContent = ({ message, content }) => {
  const args = content.replace(getPrefixRegExp(message), '').split(/ +/);
  const command = getCommand(message, args.shift().toLowerCase());
  return { message, command, args };
};

const isExecutable = ({ message, command, args }) =>
  command &&
  (!command.ownersOnly || owners.includes(message.author.id)) &&
  (!command.guildOnly || isText(message.channel)) &&
  (!command.requireArgs || args.length) &&
  !command.disabled &&
  !isInCooldownCache(message.author, command);

const createExecutable = ({ message, command, args }) => ({
  executable: async () => {
    addCooldown(message.author, command);
    return command.messageExecute(message, args);
  },
  deleteCommand: command.deleteCommand
});

const deleteCommand = (message, payload) => {
  if (
    isText(message.channel) &&
    hasPermission(message, 'MANAGE_MESSAGES') &&
    payload.some(i => i.deleteCommand)
  ) {
    message.delete();
  }
};

module.exports = async message => {
  if (message.author.bot) return;
  if (message.system) return;

  const payload = parseMessage(message)
    .map(content => ({ message, content }))
    .filter(startsWithPrefix)
    .map(parseContent)
    .filter(isExecutable)
    .map(createExecutable);
  if (!payload.length) return;

  console.log(
    isText(message.channel)
      ? `${message.guild.name}#${message.channel.name}|${message.author.tag}: ${message.content}`
      : `${message.author.tag}: ${message.content}`
  );

  await serializer(payload.map(i => i.executable));
  deleteCommand(message, payload);
};
