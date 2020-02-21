const { name } = require('../../package');

module.exports = async client => {
  console.log(`${name}|${client.user.tag}: Ready`);
};
