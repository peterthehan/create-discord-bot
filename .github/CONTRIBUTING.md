# Contributing

Welcome! Please take a moment to review this document in order to make the contribution process straightforward and effective for everyone involved.

## Table of contents

- [Communication](#communication)
- [Quick overview](#quick-overview)
- [Project](#project)
  - [Folder structure](#folder-structure)
  - [Component descriptions](#component-descriptions)
  - [Scripts](#scripts)
    - [GitHub Actions](#github-actions)
    - [Bot](#bot)
    - [Script](#script)
    - [Utility](#utility)

## Communication

- Communication should adhere to this project's [Code of Conduct](./CODE_OF_CONDUCT.md).
- Communication should occur under [issues](https://github.com/peterthehan/create-discord-bot/issues) and [pull requests](https://github.com/peterthehan/create-discord-bot/pulls) when and where possible. This ensures there is a clear paper trail of referable discussion and ideas for old and new contributors alike.
- This project's Discord server is: https://discord.gg/WjEFnzC

## Quick overview

1. Go to [Projects](https://github.com/peterthehan/create-discord-bot/projects/1) and check the issues under the `To do` column.
2. Make a comment in the issue you wish to work on to check if it's appropriate to work on as well as to check if someone else is already working on it or not.
3. Fork the repository, add your feature to a branch, and push and open a pull request.

   > Run `npm run format` and ensure all checks are passing before requesting a review!

4. Address any review comments and when everything checks out your feature will be merged, congrats and thanks! 🎉

## Project

### Folder structure

```
app/
  src/
    core/
    widgets/
      command/
    index.js
src/
  index.js
```

Some files and directories are omitted for brevity.

### Component descriptions

The project is grouped into 3 components:

1. The **utility script** - the script that is being run with the `npx peterthehan/create-discord-bot` command.

   - `src/index.js`

2. The **core bot** - the framework that drives everything under `widgets/`.

   - `app/src/core/`
   - `app/src/index.js`

3. The **command widget** - the widget used to bootstrap command-making.

   - `app/src/widgets/command/`

A diagram of how the **core bot** loads and handles widgets:

<div align="center">
  <img src="https://raw.githubusercontent.com/peterthehan/assets/master/repositories/create-discord-bot/widget-diagram.png" title="Widget diagram" alt="Widget diagram" />
</div>

### Scripts

#### GitHub Actions

- `npm run action:build` - checks that the typescript code compiles.
- `npm run action:check` - checks that the project complies with Prettier.
- `npm run action:lint` - checks that the project complies with ESLint.

These scripts are not intended to be used while developing.

#### Bot

- `npm run bot:dev` - runs the **core bot** using `nodemon`.
- `npm run bot:start` - runs the **core bot** using `node`.

#### Script

- `npm run dry` - runs the **utility script** but only prints the command line messages without actually creating a bot template.
- `npm start` - runs the **utility script** and creates a bot template.

#### Utility

- `npm run format` - first fixes ESLint issues and then runs Prettier across the entire project.
