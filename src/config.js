module.exports = {
  token: ('TOKEN' in process.env ? process.env : require('../config')).TOKEN,
  prefixes: ['.'],
  commandDelimiter: ',,',
  commandLimit: 3,
  owners: ['206161807491072000'],
  events: ['message']
};
