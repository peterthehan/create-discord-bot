module.exports = async (client, readyHandlers) => {
  console.log(__dirname, 'ready');
  readyHandlers.forEach(readyHandler => readyHandler(client));
};
