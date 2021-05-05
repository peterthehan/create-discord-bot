# Create Discord Bot

[![Discord](https://discord.com/api/guilds/258167954913361930/embed.png)](https://discord.gg/WjEFnzC) [![Twitter Follow](https://img.shields.io/twitter/follow/peterthehan.svg?style=social)](https://twitter.com/peterthehan)

Create Discord bots using a simple widget-based framework.

<div align="center">
  <img src="https://raw.githubusercontent.com/peterthehan/assets/master/repositories/create-discord-bot/npx-demo.gif" title="npx demo" alt="npx demo" />
</div>

## Table of contents

- [Getting started](#getting-started)
  - [Create bot](#create-bot)
  - [Create application](#create-application)
- [Documentation](#documentation)
  - [Updating](#updating)
  - [Command widget](#command-widget)
  - [Widget conventions](#widget-conventions)
- [Widgets](#widgets)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)

## Getting started

### Create bot

1. Go to Discord's [Developer Portal](https://discord.com/developers/applications).
2. Create a new application.
3. Go to the bot tab and add a bot user to your application.

   > Take note of the bot token on this page—you will need it in the next section.

   > Keep your token and any file containing it **private**. If it ever leaks or you suspect it may have leaked, simply `regenerate` a new token to invalidate your compromised token.

4. In the bot tab, scroll down to the `Privileged Gateway Intents` section and enable the toggles for both `Presence Intent` and `Server Members Intent`. More details on `Gateway Intents` can be found here:

   - [Gateway Update FAQ](https://support-dev.discord.com/hc/en-us/articles/360056426994)
   - [Privileged Intents](https://discord.com/developers/docs/topics/gateway#privileged-intents)

### Create application

```
npx peterthehan/create-discord-bot
```

1. Run the npx command above and follow the instructions given by the utility.

   > It will look like the GIF above for reference.

   > If you choose not to provide your bot token during the setup, you can always add it at a later time. Open the `.env` file at the root of the project to set your bot token value.

2. Once the bot is running, verify the setup was successful by sending the `.ping` command on Discord. If there are issues, check [Troubleshooting](#troubleshooting) for tips.

You're ready to create your own Discord bot! 🎉

If you were directed to follow the instructions found here from another `README`, return back there now and continue with the setup. Feel free to continue reading for more information.

## Documentation

### Updating

Update your core bot files to the latest version in this project by running `npx peterthehan/create-discord-bot` and entering the same name as your existing Discord bot when asked for the application name. This will update:

- [src/index.js](./app/src/index.js)
- [src/core/](./app/src/core)

### Command widget

`create-discord-bot` includes a [command](./app/src/widgets/command) widget. Follow the design of the [ping](./app/src/widgets/command/commands/ping.js) command to start building your own commands.

### Widget conventions

- All widgets **must** live under the [src/widgets/](./app/src/widgets) folder.
- All widgets **must** have a `handlers` folder.
- A `handlers` folder can **only** contain event handler files.
- All event handler files **must** be named exactly the same as the events found on the [Client](https://discord.js.org/#/docs/main/master/class/Client) page.

An example file tree diagram of these requirements may look like:

```
src/
  widgets/
    command/
      handlers/
        ready.js
        message.js
    widget1/
      handlers/
        messageReactionAdd.js
        messageUpdate.js
        other event handlers
    widget2/
      handlers/
        typingStart.js
        userUpdate.js
        other event handlers
```

## Widgets

The following widgets can be used by this framework by adding them into the [src/widgets/](./app/src/widgets) folder:

- [https://github.com/peterthehan/discord-active-role-bot](https://github.com/peterthehan/discord-active-role-bot)
- [https://github.com/peterthehan/discord-audit-log-bot](https://github.com/peterthehan/discord-audit-log-bot)
- [https://github.com/peterthehan/discord-birthday-role-bot](https://github.com/peterthehan/discord-birthday-role-bot)
- [https://github.com/peterthehan/discord-cron-bot](https://github.com/peterthehan/discord-cron-bot)
- [https://github.com/peterthehan/discord-emoji-log-bot](https://github.com/peterthehan/discord-emoji-log-bot)
- [https://github.com/peterthehan/discord-reaction-role-bot](https://github.com/peterthehan/discord-reaction-role-bot)
- [https://github.com/peterthehan/discord-starboard-bot](https://github.com/peterthehan/discord-starboard-bot)
- [https://github.com/peterthehan/discord-superactive-role-bot](https://github.com/peterthehan/discord-superactive-role-bot)
- [https://github.com/peterthehan/discord-twitter-bot](https://github.com/peterthehan/discord-twitter-bot)

## Troubleshooting

- Remove bots that may conflict in functionality, e.g. multiple reaction role bots.
- Use [Git Bash](https://git-scm.com/downloads) instead of the Command Prompt (cmd.exe) if you are on Windows.
- Check if your npm version supports npx by running `npm -v` (v5.2+).
- Check if you have the latest LTS version of Node.js by running `node -v` (v12+).
- If running the npx command yields the error message below, check that you have git installed by running `git --version`.
  ```
  npm ERR! code ENOENT
  npm ERR! syscall spawn git
  npm ERR! path git
  npm ERR! errno -4058
  npm ERR! enoent Error while executing:
  npm ERR! enoent undefined ls-remote -h -t
  ...
  ```
- If running the application outputs `Error: Cannot find module '...'`, try running `npm install` in the project.

Visit for more help or information!

<a href="https://discord.gg/WjEFnzC">
  <img src="https://discord.com/api/guilds/258167954913361930/embed.png?style=banner2" title="Discord server invite" alt="Discord server invite" />
</a>

## Contributing

Read the [Contributing](./CONTRIBUTING.md) documentation to get started!
