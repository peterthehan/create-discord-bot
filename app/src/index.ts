import { Client } from 'discord.js';

import token from './config';

const client = new Client();

require("./core/loadWidgetListeners")(client);

client.login(token).catch((error) => {
  console.error(error);
  process.exit(1);
});
