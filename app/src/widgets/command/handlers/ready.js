module.exports = async (client) => {
  console.log("command: ready");

  require("../loaders/loadPrefixRegExp")(client);
  require("../loaders/loadCommands")(client);
  require("../loaders/loadMessageHelpers")();
  require("../loaders/loadUserHelpers")();
};
