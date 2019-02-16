const { Client } = require('discord.js');
const { token } = require('./config');

const client = new Client();

require('./util/loadEvents')(client);

client.login(token);
