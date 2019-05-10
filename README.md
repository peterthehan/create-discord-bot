# Create Discord Bot

Create Discord bots using a simple framework.

## Create Bot

1. Go to Discord's [Developer Portal](https://discordapp.com/developers/applications/).
2. Create a new application.
3. Add a bot user to your app.
4. Invite your bot to a server using [https://discordapp.com/oauth2/authorize?client_id=DISCORD_BOT_CLIENT_ID&scope=bot](https://discordapp.com/oauth2/authorize?client_id=DISCORD_BOT_CLIENT_ID&scope=bot).
5. `Click to Reveal Token` to view your bot's token.

> Keep this token and any file containing it **private**!

## Get Bot

1. Run `git clone https://github.com/peterthehan/create-discord-bot.git && cd create-discord-bot/ && npm install`.
2. Rename [example.config.json](https://github.com/peterthehan/create-discord-bot/blob/master/example.config.json) to `config.json`.
3. Open the file and add your bot token:

```js
{
  "TOKEN": "DISCORD_BOT_TOKEN"
}
```

> Open [src/config.js](https://github.com/peterthehan/create-discord-bot/blob/master/src/config.js) to view the other bot settings.

## Run Bot

1. Run `npm start`.
2. Verify the bot is working by using the `.ping` command.

🎉 You're ready to add your own commands! 🎉

## Examples

The following bots have been made using this framework:

- https://github.com/peterthehan/discord-audit-log-bot
- https://github.com/peterthehan/discord-reaction-role-bot
- https://github.com/peterthehan/discord-region-role-bot
