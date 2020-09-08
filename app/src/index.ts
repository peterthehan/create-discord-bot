import { Client } from 'discord.js';

import loadWidgetListeners from './core/loadWidgetListeners';
import token from './config';

const client = new Client();
loadWidgetListeners(client);

client.login(token).catch((error) => {
  console.error(error);
  process.exit(1);
});
