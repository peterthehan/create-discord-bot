# Contributing

Welcome! Please take a moment to review this document in order to make the contribution process straightforward and effective for everyone involved.

## Table of contents

- [Communication](#communication)
- [Project](#project)
  - [Quick overview](#quick-overview)
  - [Scripts](#scripts)
  - [Folder structure](#folder-structure)
  - [Component descriptions](#component-descriptions)

## Communication

- Communication should adhere to this project's [Code of Conduct](./CODE_OF_CONDUCT.md).
- Communication should occur under [issues](https://github.com/peterthehan/create-discord-bot/issues) and [pull requests](https://github.com/peterthehan/create-discord-bot/pulls) when and where possible. This ensures there is a clear paper trail of referable discussion and ideas for old and new contributors alike.
- This project's Discord server is: https://discord.gg/WjEFnzC

## Project

### Quick overview

1. Go to [Projects](https://github.com/peterthehan/create-discord-bot/projects/1) and check the issues under the `To do` column.
2. Make a comment in the issue you wish to work on to check whether or not someone else is already working on it and to check if it's appropriate to work on.
3. Fork the repository, add your feature to a branch, and push and open a pull request.

> Run `npm run format` and ensure all checks are passing before requesting a review!

4. Address any review comments and when everything checks out your feature will be merged, congrats and thanks! 🎉

### Scripts

- `npm run bot` - runs the **core bot**.
- `npm run build` - compiles the **utility script** using `tsconfig.json`.
- `npm run dry` - runs the **utility script** but only prints the command line messages without actually creating a bot template.
- `npm run format` - first fixes ESLint issues and then runs Prettier across the entire project.
- `npm start` / `npm run utility` - runs the **utility script** and creates a bot template.

### Folder structure

```
app/
  src/
    core/
    widgets/
      command/
    index.js
index.js
```

> Some files and directories are omitted for brevity.

### Component descriptions

The project is grouped into 3 components:

1. The **utility script** - the script that is being run with the `npx peterthehan/create-discord-bot` command.

   - `src/index.ts`

2. The **core bot** - the framework that drives everything under `widgets/`.

   - `app/src/core/`
   - `app/src/index.js`

3. The **command widget** - the widget used to bootstrap command-making.

   - `app/src/widgets/command/`

A diagram of how the **core bot** loads and handles widgets:

<div align="center">
  <img src="https://raw.githubusercontent.com/peterthehan/assets/master/repositories/create-discord-bot/widget-diagram.png" title="Widget diagram" alt="Widget diagram" />
</div>
