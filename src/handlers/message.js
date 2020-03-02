module.exports = async (message, messageHandlers) => {
  console.log(__dirname, 'message');
  messageHandlers.forEach(messageHandler => messageHandler(message));
};
