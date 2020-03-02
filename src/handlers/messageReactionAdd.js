module.exports = async (messageReaction, user, messageReactionAddHandlers) => {
  console.log(__dirname, 'messageReactionAdd');
  messageReactionAddHandlers.forEach(messageReactionAddHandler =>
    messageReactionAddHandler(messageReaction, user)
  );
};
