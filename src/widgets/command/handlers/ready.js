module.exports = async client => {
  console.log('command: ready');

  require('../util/loadCommands')(client);
};
