const { prefixes } = require("../config");

const escapeConfigPrefix = (prefix) => {
  return prefix
    .split("")
    .map((char) => `\\${char}`)
    .join("");
};

module.exports = (client) => {
  const botMentionPrefix = `<@!?${client.user.id}>`;
  const configPrefixes = prefixes
    .filter((prefix) => prefix !== "")
    .map(escapeConfigPrefix);

  client.prefixRegExp = new RegExp(
    `^(${[botMentionPrefix, ...configPrefixes].join("|")})\\s*`
  );
};
