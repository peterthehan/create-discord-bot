const { owners } = require('../config');

const cooldownCache = {};

module.exports = {
  addCooldown: (author, command) => {
    if (owners.includes(author.id)) return;

    if (!(command.name in cooldownCache)) {
      cooldownCache[command.name] = {};
    }

    cooldownCache[command.name][author.id] = Date.now();
    setTimeout(
      () => delete cooldownCache[command.name][author.id],
      command.cooldown * 1000
    );
  },
  isInCooldownCache: (author, command) => {
    if (owners.includes(author.id)) return false;
    if (!(command.name in cooldownCache)) return false;
    if (!(author.id in cooldownCache[command.name])) return false;

    const expirationDate =
      cooldownCache[command.name][author.id] + command.cooldown * 1000;
    const cooldownRemaining = ((expirationDate - Date.now()) / 1000).toFixed(1);

    author.send(
      `Please wait ${cooldownRemaining}s before reusing the \`${command.name}\` command.`
    );
    return true;
  }
};
