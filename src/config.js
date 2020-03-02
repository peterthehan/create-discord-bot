module.exports = {
  token: ('TOKEN' in process.env ? process.env : require('../token')).TOKEN
};
