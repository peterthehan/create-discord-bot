const cooldownCache = {};

const getCooldownKey = (author, command) => {
  return `${author.id}-${command.name}`;
};

const getCooldownInSeconds = (cooldown) => {
  const MAX_DELAY = Math.pow(2, 31) - 1;
  return Math.min(cooldown * 1000, MAX_DELAY);
};

const getCooldownRemaining = (expirationDate) => {
  return ((expirationDate - Date.now()) / 1000).toFixed(1);
};

module.exports = class CooldownCache {
  static setCooldown(author, command) {
    if (author.isOwner()) {
      return;
    }

    const key = getCooldownKey(author, command);
    if (key in cooldownCache) {
      return;
    }

    const cooldownInSeconds = getCooldownInSeconds(command.cooldown);
    const expirationDate = Date.now() + cooldownInSeconds;

    cooldownCache[key] = expirationDate;
    setTimeout(() => delete cooldownCache[key], cooldownInSeconds);
  }

  static isInCooldown(author, command) {
    if (author.isOwner()) {
      return false;
    }

    const key = getCooldownKey(author, command);
    if (!(key in cooldownCache)) {
      return false;
    }

    const cooldownRemaining = getCooldownRemaining(cooldownCache[key]);
    author.send(`${command.name} cooldown: ${cooldownRemaining}s remaining`);
    return true;
  }
};
