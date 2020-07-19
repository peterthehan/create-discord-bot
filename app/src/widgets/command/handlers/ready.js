module.exports = async (client) => {
  console.log("command: ready");

  require("../helpers/loadPrefixRegExp")(client);
  require("../helpers/loadCommands")(client);
  require("../helpers/loadMessageHelpers")();
  require("../helpers/loadUserHelpers")();
};
