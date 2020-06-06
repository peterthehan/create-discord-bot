module.exports = async (client) => {
  console.log("command: ready");

  require("../util/loadPrefixRegExp")(client);
  require("../util/loadCommands")(client);
  require("../util/loadMessageHelpers")();
};
