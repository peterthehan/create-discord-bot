#!/usr/bin/env node

import { Client } from "discord.js";
import { execSync } from "child_process";
import fs from "fs-extra";
import path from "path";
import prompts from "prompts";
import types from "./declarations/types";
import validatePackageName from 'validate-npm-package-name'

const appDirectory: string = path.join(__dirname, "../app");
const appPackage: types.Package = require(path.join(
  appDirectory,
  "package.json"
));

const utilityPackage: types.Package = require(path.join(
  __dirname,
  "../package.json"
));
const utilityNameAndVersion = `${utilityPackage.name} v${utilityPackage.version}`;

console.log(`This utility will walk you through creating a ${utilityPackage.name} application.

Press ENTER to use the default.
Press ^C at any time to quit.

${utilityNameAndVersion}`);

const questions: prompts.PromptObject<string>[] = [
  {
    type: "text",
    name: "name",
    initial: appPackage.name,
    validate: (name) => {
      const { validForNewPackages, errors, warnings } = validatePackageName(
        name
      );
      return (
        validForNewPackages || `Error: ${(errors || warnings).join(", ")}.`
      );
    },
    message: "Application name?",
  },
  {
    type: "password",
    name: "token",
    initial: "DISCORD_BOT_TOKEN_PLACEHOLDER",
    message: "Discord bot token?",
  },
];
prompts(questions)
  .then(async (answers: { name: string; token: string }) => {
    console.log();
    const { name, token } = answers;

    const directory: string = path.resolve(name);

    const updateSteps: types.Step[] = [
      {
        message: `Updating core files in '${name}'...`,
        action: () => {
          fs.copySync(`${appDirectory}/src/core`, `${directory}/src/core`);
          fs.copySync(
            `${appDirectory}/src/index.js`,
            `${directory}/src/index.js`
          );
        },
      },
    ];
    const cleanInstallSteps: types.Step[] = [
      {
        message: `Creating directory '${name}'...`,
        action: () => fs.mkdirSync(directory),
      },
      {
        message: "Creating boilerplate...",
        action: () => {
          fs.copySync(appDirectory, directory);
          const gitIgnore = "node_modules/\ntoken.json\n";
          fs.writeFileSync(path.join(directory, ".gitignore"), gitIgnore);
        },
      },
      {
        message: "Updating package.json...",
        action: () => {
          const description = `Generated by ${utilityNameAndVersion}.`;
          const newPackage = { ...appPackage, name, description };
          fs.writeFileSync(
            path.join(directory, "package.json"),
            `${JSON.stringify(newPackage, null, 2)}\n`
          );
        },
      },
      {
        message: "Writing token.json...",
        action: () => {
          const newToken = { token };
          fs.writeFileSync(
            path.join(directory, "token.json"),
            `${JSON.stringify(newToken, null, 2)}\n`
          );
        },
      },
      {
        message: "Installing modules...",
        action: () => {
          process.chdir(directory);
          execSync("npm i --loglevel=error");
        },
      },
    ];

    const isUpdate = fs.existsSync(directory);

    let steps: types.Step[];
    if (isUpdate) {
      const updateAnswer = await prompts([
        {
          type: "confirm",
          name: "update",
          message: `Directory '${directory}' already exists. Do you want to update it?`,
        },
      ]);
      console.log();

      if (!updateAnswer.update) {
        throw `Error: '${directory}' already exists.\nQuitting...`;
      }

      steps = updateSteps;
    } else {
      steps = cleanInstallSteps;
    }

    const [, , ...args] = process.argv;
    const isDryRun: boolean = args[0] === "--dry-run";

    steps.forEach(({ message, action }) => {
      console.log(message);
      if (!isDryRun) {
        action();
      }
    });

    if (!isUpdate) {
      console.log();
      console.log("Generating bot invite link...");
      const client: Client = new Client();
      await client
        .login(token)
        .then(() =>
          console.log(
            `Invite your bot: https://discordapp.com/oauth2/authorize?scope=bot&client_id=${client.user.id}`
          )
        )
        .catch(() =>
          console.warn(
            "Bot invite link was not generated due to the given bot token being invalid."
          )
        );
      console.log();
    }

    console.log(`Done!\n\nStart by running:\n\t$ cd ${name}/\n\t$ npm start`);

    process.exit(0);
  })
  .catch(console.error);
