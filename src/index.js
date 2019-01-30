const { Client } = require('discord.js');
const { token } = require('./config');

// create bot
const client = new Client();
client.login(token);

// load event handlers
require('./util/loadEvents')(client);
