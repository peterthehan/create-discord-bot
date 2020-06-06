#!/usr/bin/env node

const fs = require("fs-extra");
const path = require("path");
const execSync = require("child_process").execSync;
const qoa = require("qoa");

const appDirectory = path.join(__dirname, "./app");
const appPackage = require(path.join(appDirectory, "./package.json"));
const appToken = { TOKEN: "DISCORD_BOT_TOKEN_PLACEHOLDER" };

const package = require(path.join(__dirname, "./package.json"));
const packageNameAndVersion = `${package.name} v${package.version}`;

console.log(
  `This utility will walk you through creating a ${package.name} application.\n`
);
console.log("Press ENTER to use the default.");
console.log("Press ^C at any time to quit.\n");
console.log(packageNameAndVersion);

const questions = [
  {
    type: "input",
    query: `Application name: (${appPackage.name})`,
    handle: "name",
  },
  {
    type: "secure",
    query: `Discord bot token: (${appToken.TOKEN})`,
    handle: "TOKEN",
  },
];

qoa.prompt(questions).then((answers) => {
  const name = answers.name.length ? answers.name : appPackage.name;
  const TOKEN = answers.TOKEN.length ? answers.TOKEN : appToken.TOKEN;

  const directory = path.resolve(`./${name}`);
  if (fs.existsSync(directory)) {
    console.error(`Error: Directory '${directory}' already exists.`);
    return;
  }

  console.log(`Creating directory '${name}'...`);
  fs.mkdirSync(directory);

  console.log(`Creating boilerplate...`);
  fs.copySync(appDirectory, directory);

  console.log(`Updating package.json...`);
  const description = `Generated by ${packageNameAndVersion}.`;
  const newPackage = { ...appPackage, name, description };
  fs.writeFileSync(
    path.join(directory, "./package.json"),
    JSON.stringify(newPackage, null, 2)
  );

  console.log(`Writing token.json...`);
  const newToken = { ...appToken, TOKEN };
  fs.writeFileSync(
    path.join(directory, "./src/token.json"),
    JSON.stringify(newToken, null, 2)
  );

  console.log(`Installing modules...`);
  process.chdir(directory);
  execSync(`npm i --loglevel=error`);

  console.log("Done!");
  console.log(`Start by running:
  
\t$ cd ${name}/
\t$ npm start`);
});
