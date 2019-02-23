# Create Discord Bot

Create Discord bots using a simple framework.

## Set up Bot

1. Go to Discord's [Developer Portal](https://discordapp.com/developers/applications/).
2. Create a new application.
3. Add a bot user to your app.
4. Invite your bot to a server via [https://discordapp.com/oauth2/authorize?client_id=DISCORD_BOT_CLIENT_ID_HERE&scope=bot](https://discordapp.com/oauth2/authorize?client_id=DISCORD_BOT_CLIENT_ID_HERE&scope=bot).
5. Click `Click to Reveal Token` to view your bot's token.

> Keep this token and any file containing it **private**!

## Get Bot

1. Type:

```sh
git clone https://github.com/peterthehan/create-discord-bot.git
cd create-discord-bot/
npm install
```

2. Find [example.config.json](https://github.com/peterthehan/create-discord-bot/blob/master/example.config.json) and rename the file to `config.json`.
3. Open the file and add:

```js
{
  "TOKEN": "DISCORD_BOT_TOKEN_HERE"
}
```

> Navigate to [src/config.js](https://github.com/peterthehan/create-discord-bot/blob/master/src/config.js) to view the other bot presets.

## Run Bot

1. Type `npm start`.
2. Verify the bot is working by using the `ping` command.

You're ready to add your own commands! 🎉
