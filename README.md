# Create Discord Bot

[![Discord](https://discordapp.com/api/guilds/258167954913361930/embed.png)](https://discord.gg/WjEFnzC) [![Twitter Follow](https://img.shields.io/twitter/follow/peterthehan.svg?style=social)](https://twitter.com/peterthehan) [![Ko-fi](https://img.shields.io/badge/Donate-Ko--fi-F16061.svg?logo=ko-fi)](https://ko-fi.com/peterthehan) [![Patreon](https://img.shields.io/badge/Donate-Patreon-F96854.svg?logo=patreon)](https://www.patreon.com/peterthehan)

Create Discord bots using a simple widget-based framework.

<div align="center">
  <img src="https://raw.githubusercontent.com/peterthehan/assets/master/repositories/create-discord-bot/npx-demo.gif" title="npx demo" alt="npx demo" />
</div>

## Table of contents

- [Getting started](#getting-started)
  - [Setup bot](#setup-bot)
  - [Create bot](#create-bot)
- [Documentation](#documentation)
  - [Command widget](#command-widget)
  - [Widget conventions](#widget-conventions)
- [Widgets](#widgets)
- [Updating](#updating)
- [Troubleshooting](#troubleshooting)

## Getting started

### Setup bot

1. Go to Discord's [Developer Portal](https://discordapp.com/developers/applications).
2. Create a new application.

> Take note of your bot's client ID. You will need this to invite your bot to a server.

3. Go to the bot tab and add a bot user to your application.

> Take note of your bot's token. You will need this in the next section.

4. Invite your bot to a server using: [https://discordapp.com/oauth2/authorize?scope=bot&client_id=DISCORD_BOT_CLIENT_ID_PLACEHOLDER](https://discordapp.com/oauth2/authorize?scope=bot&client_id=DISCORD_BOT_CLIENT_ID_PLACEHOLDER)

> Alternatively, `npx peterthehan/create-discord-bot` will generate a bot invite link for you when you create the project for the first time and you provide a valid bot token.

> A Discord bot's client ID is not the same as its token. Keep your token and any file containing it **private**. If your token ever leaks or you suspect it may have leaked, simply `regenerate` a new token to invalidate your compromised token.

### Create bot

```
npx peterthehan/create-discord-bot
cd my-discord-bot
npm start
```

Verify the bot is working by using the `.ping` command.

🎉 You're ready to create your own Discord bot! 🎉

## Documentation

### Command widget

`create-discord-bot` includes a [command](./app/src/widgets/command) widget. Follow the design of the [ping](./app/src/widgets/command/commands/ping.js) command to start building your own commands.

### Widget conventions

- All widgets **must** live under the [src/widgets](./app/src/widgets) folder.
- All widgets **must** have a `handlers` folder.
- A `handlers` folder can **only** contain event handler files.
- All event handler files **must** be named exactly the same as the events found on the [Client](https://discord.js.org/#/docs/main/master/class/Client) page.

An example file tree diagram of these requirements could look like:

```
src
├──widgets
│  ├──command
│  │  ├──handlers
│  |  |  ├──ready.js
│  |  |  └──message.js
│  ├──widget1
│  │  ├──handlers
│  |  |  ├──messageReactionAdd.js
│  |  |  ├──messageUpdate.js
│  |  |  └──other event handlers
│  ├──widget2
│  │  ├──handlers
│  |  |  ├──typingStart.js
│  |  |  ├──userUpdate.js
|  |  |  └──other event handlers
```

<div align="center">
  <img src="https://raw.githubusercontent.com/peterthehan/assets/master/repositories/create-discord-bot/widget-diagram.png" title="Widget diagram" alt="Widget diagram" />
</div>

## Widgets

The following widgets can be used by this framework by adding them into the [src/widgets](./app/src/widgets) folder:

- [https://github.com/peterthehan/discord-active-role-bot](https://github.com/peterthehan/discord-active-role-bot)
- [https://github.com/peterthehan/discord-audit-log-bot](https://github.com/peterthehan/discord-audit-log-bot)
- [https://github.com/peterthehan/discord-birthday-role-bot](https://github.com/peterthehan/discord-birthday-role-bot)
- [https://github.com/peterthehan/discord-emoji-log-bot](https://github.com/peterthehan/discord-emoji-log-bot)
- [https://github.com/peterthehan/discord-reaction-role-bot](https://github.com/peterthehan/discord-reaction-role-bot)

## Updating

Update your bot's core files to the latest version in this project by running `npx peterthehan/create-discord-bot` and using the same name as your existing Discord bot when asked for the application name. This will update:

- [src/index.js](./app/src/index.js)
- [src/core](./app/src/core)

## Troubleshooting

- Use [Git Bash](https://git-scm.com/downloads) instead of the Command Prompt (cmd.exe) if you are on Windows.
- `npm -v` to check if your npm version supports npx (v5.2+).
- `node -v` to check if you have the latest LTS version of Node.js (v12+).
- `npm install` if running the application outputs `Error: Cannot find module '...'`.

Visit for more help or information!

<a href="https://discord.gg/WjEFnzC">
  <img src="https://discordapp.com/api/guilds/258167954913361930/embed.png?style=banner2" title="Discord server invite" alt="Discord server invite" />
</a>
