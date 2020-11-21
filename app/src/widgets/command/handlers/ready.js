module.exports = async (client) => {
  console.log("command: ready");

  require("../helpers/loadChannelHelpers")();
  require("../helpers/loadCommands")(client);
  require("../helpers/loadGuildHelpers")();
  require("../helpers/loadMessageHelpers")();
  require("../helpers/loadPrefixRegExp")(client);
  require("../helpers/loadUserHelpers")();
};
