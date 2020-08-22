#!/usr/bin/env node

import * as types from './types';

const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs-extra");
const qoa = require("qoa");
const validate = require("validate-npm-package-name");

const appDirectory: string = path.join("../", "app");
const appPackage: any = require(path.join(appDirectory, "package.json"));
const appToken: types.Token = { token: "DISCORD_BOT_TOKEN_PLACEHOLDER" };

const utilityPackage: any = require(path.join("../", "package.json"));
const utilityNameAndVersion: string = `${utilityPackage.name} v${utilityPackage.version}`;

console.log(`This utility will walk you through creating a ${utilityPackage.name} application.

Press ENTER to use the default.
Press ^C at any time to quit.

${utilityNameAndVersion}`);

const questions: object[] = [
  {
    type: "input",
    query: `Application name: (${appPackage.name})`,
    handle: "name",
  },
  {
    type: "secure",
    query: `Discord bot token: (${appToken.token})`,
    handle: "token",
  },
];
qoa
  .prompt(questions)
  .then(async (answers: { name: any; token: string; }) => {
    console.log();
    const name: string = answers.name || appPackage.name;
    const token: string = answers.token || appToken.token;

    const validationResult: types.ValidationResult = validate(name);
    if (!validationResult.validForNewPackages && validationResult.errors) {
      throw `Error: ${validationResult.errors.join(", ")}.\nQuitting...`;
    }

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
          const newToken = { ...appToken, token };
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

    let steps: types.Step[];
    if (fs.existsSync(directory)) {
      const updateAnswer = await qoa.prompt([
        {
          type: "confirm",
          query: `Directory '${directory}' already exists. Do you want to update it?`,
          handle: "update",
          accept: "y",
          deny: "n",
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

    console.log(`Done!\n\nStart by running:\n\t$ cd ${name}/\n\t$ npm start`);
  })
  .catch(console.error);
