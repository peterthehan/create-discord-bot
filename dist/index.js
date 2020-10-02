#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const prompts_1 = __importDefault(require("prompts"));
const validate_npm_package_name_1 = __importDefault(require("validate-npm-package-name"));
const getApplicationId = (token) => {
    try {
        const response = child_process_1.execSync(`curl -s -X GET -H "Authorization: Bot ${token}" "https://discordapp.com/api/oauth2/applications/@me"`).toString();
        const parsedResponse = JSON.parse(response);
        return parsedResponse.id || null;
    }
    catch {
        return null;
    }
};
const appDir = path_1.default.join(__dirname, "../app");
const appPackage = require(path_1.default.join(appDir, "package.json"));
const { name, version } = require(path_1.default.join(__dirname, "../package.json"));
const utilityNameAndVersion = `${name} v${version}`;
console.log(`This utility will walk you through creating a ${name} application.\n\nPress ENTER to use the default.\nPress ^C at any time to quit.\n\n${utilityNameAndVersion}`);
prompts_1.default([
    {
        type: "text",
        name: "name",
        initial: appPackage.name,
        validate: (name) => {
            const { validForNewPackages, errors, warnings } = validate_npm_package_name_1.default(name);
            return (validForNewPackages || `Error: ${(errors || warnings).join(", ")}.`);
        },
        message: "Application name?",
    },
])
    .then(async ({ name }) => {
    const dir = path_1.default.resolve(name);
    const isUpdate = fs_extra_1.default.existsSync(dir);
    let steps;
    if (isUpdate) {
        const { update } = await prompts_1.default([
            {
                type: "confirm",
                name: "update",
                message: `Directory '${dir}' already exists. Do you want to update it?`,
            },
        ]);
        if (!update) {
            console.log();
            throw "Quitting...";
        }
        steps = [
            {
                message: `Updating core files in '${name}'...`,
                action: () => {
                    fs_extra_1.default.copySync(`${appDir}/src/core`, `${dir}/src/core`);
                    fs_extra_1.default.copySync(`${appDir}/src/index.js`, `${dir}/src/index.js`);
                },
            },
        ];
    }
    else {
        const { token } = await prompts_1.default([
            {
                type: "password",
                name: "token",
                initial: "DISCORD_BOT_TOKEN_PLACEHOLDER",
                message: "Discord bot token?",
            },
        ]);
        steps = [
            {
                message: `Creating directory '${name}'...`,
                action: () => fs_extra_1.default.mkdirSync(dir),
            },
            {
                message: "Creating boilerplate...",
                action: () => {
                    fs_extra_1.default.copySync(appDir, dir);
                    fs_extra_1.default.writeFileSync(path_1.default.join(dir, ".gitignore"), "node_modules/\ntoken.json\n");
                },
            },
            {
                message: "Updating package.json...",
                action: () => {
                    const description = `Generated by ${utilityNameAndVersion}.`;
                    const newPackage = { ...appPackage, name, description };
                    fs_extra_1.default.writeFileSync(path_1.default.join(dir, "package.json"), `${JSON.stringify(newPackage, null, 2)}\n`);
                },
            },
            {
                message: "Writing token.json...",
                action: () => fs_extra_1.default.writeFileSync(path_1.default.join(dir, "token.json"), `${JSON.stringify({ token }, null, 2)}\n`),
            },
            {
                message: "Installing modules...",
                action: () => {
                    process.chdir(dir);
                    child_process_1.execSync("npm ci");
                },
            },
            {
                message: "\nGenerating bot invite link...",
                ignoreDry: true,
                action: () => {
                    const applicationId = getApplicationId(token);
                    console.log(applicationId
                        ? `Invite your bot: https://discordapp.com/oauth2/authorize?scope=bot&client_id=${applicationId}`
                        : "The given bot token was invalid so no link was generated.");
                },
            },
        ];
    }
    const [, , ...args] = process.argv;
    const isDryRun = args[0] === "--dry-run";
    console.log();
    steps.forEach(({ message, ignoreDry, action }) => {
        console.log(message);
        if (ignoreDry || !isDryRun) {
            action();
        }
    });
    console.log();
    console.log(`Done!\n\nStart by running:\n\t$ cd ${name}/\n\t$ npm start`);
    process.exit(0);
})
    .catch(console.error);
