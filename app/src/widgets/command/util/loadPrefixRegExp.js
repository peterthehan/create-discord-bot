const { prefixes } = require("../config");

const escapeConfigPrefix = (prefix) => {
  return prefix
    .split("")
    .map((char) => `\\${char}`)
    .join("");
};

const getPrefixRegExp = (client) => {
  const botMentionPrefix = `<@!?${client.user.id}>`;
  const configPrefixes = prefixes
    .filter((prefix) => prefix !== "")
    .map(escapeConfigPrefix);

  return new RegExp(
    `^(${[botMentionPrefix, ...configPrefixes].join("|")})\\s*`
  );
};

module.exports = (client) => {
  client.prefixRegExp = getPrefixRegExp(client);
};
