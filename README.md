# Create Discord Bot

Create Discord bots using a simple template.

## Setup

#### Discord Bot Setup

The following instructions assume you are signed in with a Discord account.

1. Go to Discord's [Developer Portal](https://discordapp.com/developers/applications/).
2. Create a new application.
3. Add a bot user to your app.
4. Invite your bot to your server via [https://discordapp.com/oauth2/authorize?client_id=DISCORD_BOT_CLIENT_ID_HERE&scope=bot](https://discordapp.com/oauth2/authorize?client_id=DISCORD_BOT_CLIENT_ID_HERE&scope=bot).
5. Click `Click to Reveal Token` to view your bot's token.

> Keep your Discord bot token and any file containing it **private**!

#### Get Bot

1. Type `git clone https://github.com/Johj/create-discord-bot.git`.
2. Type `cd create-discord-bot/` and `npm install`.
3. Navigate to `src/config.json` and add your bot's token:

```js
{
  "token": "DISCORD_BOT_TOKEN_HERE",
  "prefix": ".",
  "commandDelimiter": "\n",
  "commandLimit": "5"
}
```

#### Run Bot

1. Type `npm start` or `node src/index.js` to run.
2. Verify the bot is working by using the `.ping` command in the server you invited the bot.
3. You're ready to add your own commands!
