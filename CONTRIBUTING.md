# Contributing

Welcome! Please take a moment to review this document in order to make the contribution process is straightforward and effective for everyone involved.

## Quick overview

1. Go to [Projects](https://github.com/peterthehan/create-discord-bot/projects/1) and check the issues under the `To do` column.
2. Make a comment in the issue you wish to work on to check if someone else is already working on it and to check if it's appropriate to work on.
3. Fork the repository, add your feature to a branch, and push and open a pull request.
4. Address any review comments and when everything checks out your feature will be merged, congrats and thanks!

## Communication

- Communication should occur under issues and pull requests where possible. This ensures there is a clear paper trail of referable discussion and ideas for old and new contributors alike.
- Communication should adhere to this project's [Code of Conduct](./CODE_OF_CONDUCT.md).
- This project's Discord server is: https://discord.gg/WjEFnzC

## Folder structure

```
create-discord-bot/
  app/
    src/
      core/
      widgets/
        command/
      index.js
  index.js
```

> Some files and directories are omitted for brevity.

## Project overview

The project is largely grouped into 3 parts:

1. The **utility script** - this is what is being run with the `npx` command.

   - `create-discord-bot/index.js`

2. The **core bot** - this is the framework that drives everything under `widgets`.

   - `create-discord-bot/app/src/core/`
   - `create-discord-bot/app/src/index.js`

3. The **command widget** - this is widget provided to bootstrap command-making.

   - `create-discord-bot/app/src/widgets/command`
