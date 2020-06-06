const { ownerIds } = require("../config");

module.exports = (user) => {
  return ownerIds.includes(user.id);
};
