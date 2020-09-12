
module.exports = {
    "**/*.ts": ["npx eslint --fix", "prettier --no-config --write", "tsc", "git add dist"]
};