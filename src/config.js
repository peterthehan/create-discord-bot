module.exports = {
  token: ('TOKEN' in process.env ? process.env : require('../config')).TOKEN,
  prefixes: ['.'],
  commandDelimiter: '\n',
  commandLimit: 3,
  owners: ['206161807491072000'],
  events: ['message']
};
