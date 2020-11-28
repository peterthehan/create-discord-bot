module.exports = async (client) => {
  console.log("command: ready");

  require("../helpers/loadCommands")(client);
  require("../helpers/loadPrefixRegExp")(client);

  require("../helpers/loadChannelHelpers")();
  require("../helpers/loadClientHelpers")();
  require("../helpers/loadGuildHelpers")();
  require("../helpers/loadMessageHelpers")();
  require("../helpers/loadUserHelpers")();
};
