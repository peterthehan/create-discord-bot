const Discord = require('discord.js');
const config = require('./config.json');

// create bot
const client = new Discord.Client();

// load event handlers
require('./util/loadEvents.js')(client);

client.login(config.token);
