# Create Discord Bot

[![Discord](https://discord.com/api/guilds/258167954913361930/embed.png)](https://discord.gg/WjEFnzC) [![Twitter Follow](https://img.shields.io/twitter/follow/peterthehan.svg?style=social)](https://twitter.com/peterthehan)

A module-based Discord bot template.

## Getting started

### Register a Discord bot application

1. Go to Discord's [Developer Portal](https://discord.com/developers/applications).
2. Create a new application.

   > Take note of the `APPLICATION ID` on the General Information tab page. You will need it to invite the bot to your server in step 5.

3. Go to the Bot tab and add a bot user to your application.

   > Take note of the `TOKEN` on the Bot tab page. You will need it in step 3 of the next section.

   > Keep your token and any file containing it **private**. If it ever leaks or you suspect it may have leaked, simply `regenerate` a new token to invalidate your compromised token.

4. While in the Bot tab, scroll down to the Privileged Gateway Intents section and enable the toggles for both `Presence Intent` and `Server Members Intent`. More information on Gateway Intents can be found here:

   - [Gateway Update FAQ](https://support-dev.discord.com/hc/en-us/articles/360056426994)
   - [Privileged Intents](https://discord.com/developers/docs/topics/gateway#privileged-intents)

5. Lastly, invite the bot to your server using the following link template: [https://discord.com/oauth2/authorize?scope=bot&client_id=APPLICATION_ID_HERE](https://discord.com/oauth2/authorize?scope=bot&client_id=APPLICATION_ID_HERE)

### Create a Discord bot project

1. Run the following commands to bootstrap a Discord bot project in your working directory:

   > Replace `my-discord-bot` in the commands below with your own preferred project name!

   ```
   npx degit peterthehan/create-discord-bot my-discord-bot
   ```

   ```
   cd my-discord-bot
   ```

   ```
   npm i
   ```

2. Run the following command to rename the `.env` file:

   ```
   mv .env.example .env
   ```

3. Open the `.env` file and add your Discord bot token.

4. Lastly, run the following command to start the bot:

   ```
   npm start
   ```

   Verify the bot is running properly by sending messages in your server. The bot should log these messages in your terminal. If there are any issues, check [Troubleshooting](#troubleshooting).

You're ready to create your own Discord bot! 🎉

If you were directed to follow the instructions found here from another `README`, return back there now and continue with the setup. Feel free to continue reading for more information.

## Bots

The following bots can be used by this template by adding them into the [/src/bots](./src/bots) folder:

- [discord-active-role-bot](https://github.com/peterthehan/discord-active-role-bot)
- [discord-audit-log-bot](https://github.com/peterthehan/discord-audit-log-bot)
- [discord-birthday-role-bot](https://github.com/peterthehan/discord-birthday-role-bot)
- [discord-cron-bot](https://github.com/peterthehan/discord-cron-bot)
- [discord-dad-bot](https://github.com/peterthehan/discord-dad-bot)
- [discord-dynamic-voice-channels-bot](https://github.com/peterthehan/discord-dynamic-voice-channels-bot)
- [discord-reaction-role-bot](https://github.com/peterthehan/discord-reaction-role-bot)
- [discord-starboard-bot](https://github.com/peterthehan/discord-starboard-bot)
- [discord-superactive-role-bot](https://github.com/peterthehan/discord-superactive-role-bot)
- [discord-twitter-bot](https://github.com/peterthehan/discord-twitter-bot)

## Troubleshooting

- Remove bots in your server that may conflict in functionality, e.g. multiple reaction role bots.
- Use [Git Bash](https://git-scm.com/downloads) instead of the Command Prompt (cmd.exe) if you are on Windows.
- Check that your:
  - `node` version is `>=16.6.0` by running `node -v`.
  - `npm` version is `>=7.0.0` by running `npm -v`.
- If running the application outputs:
  - `Error: Cannot find module '...'`, try running `npm i` in the project directory.
  - `DiscordAPIError: Missing Permissions`, verify your bot has the correct `Manage` permissions.

Visit for more help or information!

<a href="https://discord.gg/WjEFnzC">
  <img src="https://discord.com/api/guilds/258167954913361930/embed.png?style=banner2" title="Discord server invite" alt="Discord server invite" />
</a>
