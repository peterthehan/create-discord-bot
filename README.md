# Create Discord Bot

Create Discord bots using a simple template.

## Setup

#### Discord Bot Setup

The following instructions assume you are signed in with a Discord account.

1. Go to Discord's [My Apps](https://discordapp.com/developers/applications/me) page.
2. Create a new app.
3. Click the `Create a Bot User` button and confirm.
4. You can create an invitation link for your bot with `https://discordapp.com/oauth2/authorize?client_id=YOUR_DISCORD_BOT_CLIENT_ID_HERE&scope=bot`.
5. Click `click to reveal` to view your bot's token.

>Keep your Discord bot token and any file containing it **private**!

#### Get Bot

1. Type `git clone https://github.com/Johj/create-discord-bot.git`.
2. Type `cd create-discord-bot/` and `npm install`.
3. In the root of the `src` folder, open the `config.json` file and add your bot's token:

```
{
  "token": "YOUR_DISCORD_BOT_TOKEN_HERE",
  "prefix": "!"
}
```

4. Type `npm start` or `node src/index.js` to run.
