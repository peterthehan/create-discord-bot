module.exports = (message, user) => {
  const log = [
    ...(message.channel.type === "text"
      ? [message.guild, `#${message.channel.name}`]
      : ["DM"]),
    `${user.tag}: ${message.content}`,
  ];

  console.log(log.join(" | "));
};
