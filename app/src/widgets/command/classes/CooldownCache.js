const cooldownCache = {};

const MAX_DELAY = Math.pow(2, 31) - 1;

const getCooldownKey = (user, command) => {
  return `${user.id}-${command.name}`;
};

const getCooldownInSeconds = (cooldown) => {
  return Math.min(cooldown * 1000, MAX_DELAY);
};

const getCooldownRemaining = (expirationDate) => {
  return ((expirationDate - Date.now()) / 1000).toFixed(1);
};

module.exports = class CooldownCache {
  static startCooldown(user, command) {
    if (user.isOwner()) {
      return;
    }

    const key = getCooldownKey(user, command);
    if (key in cooldownCache) {
      return;
    }

    const cooldownInSeconds = getCooldownInSeconds(command.cooldown);
    const expirationDate = Date.now() + cooldownInSeconds;

    cooldownCache[key] = expirationDate;
    setTimeout(() => delete cooldownCache[key], cooldownInSeconds);
  }

  static isOnCooldown(message, user, command) {
    const key = getCooldownKey(user, command);
    if (!(key in cooldownCache)) {
      return false;
    }

    const cooldownRemaining = getCooldownRemaining(cooldownCache[key]);
    const cooldownMessage = `${user}, ${command.name}: ${cooldownRemaining}s cooldown remaining`;
    user
      .send(cooldownMessage)
      .catch(() => message.channel.send(cooldownMessage));

    return true;
  }
};
