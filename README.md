# Create Discord Bot

Create Discord bots using a simple framework.

### Discord Bot Setup

1. Go to Discord's [Developer Portal](https://discordapp.com/developers/applications/).
2. Create a new application.
3. Add a bot user to your app.
4. Invite your bot to your server via [https://discordapp.com/oauth2/authorize?client_id=DISCORD_BOT_CLIENT_ID_HERE&scope=bot](https://discordapp.com/oauth2/authorize?client_id=DISCORD_BOT_CLIENT_ID_HERE&scope=bot).
5. Click `Click to Reveal Token` to view your bot's token.

> Keep your token and any file containing it **private**!

### Get Bot

1.
```sh
git clone https://github.com/Johj/create-discord-bot.git
cd create-discord-bot/
npm install
```

2. Navigate to `src/config.json`:
```js
{
  "token": "DISCORD_BOT_TOKEN_HERE",
  "prefix": ".",
  "commandDelimiter": "\n",
  "commandLimit": "5"
}
```

### Run Bot

1. Type `npm start` to run.
2. Verify the bot is working by using the `ping` command.
3. You're ready to add your own commands!
