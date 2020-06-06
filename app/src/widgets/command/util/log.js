module.exports = (message) => {
  const log = [
    ...(message.channel.type === "text"
      ? [message.guild, `#${message.channel.name}`]
      : ["DM"]),
    `${message.author.tag}: ${message.content}`,
  ];

  console.log(log.join(" | "));
};
