const fs = require('fs');
const path = require('path');

const getFileNames = filePath =>
  fs
    .readdirSync(path.resolve(__dirname, filePath))
    .map(fileName => fileName.replace(/\.[^/.]+$/, ''));

const getHandlerFilePath = widgetName => `../widgets/${widgetName}/handlers`;

const getHandlers = handlerFilePath =>
  getFileNames(handlerFilePath).map(handlerName => ({
    handlerName,
    handler: require(`${handlerFilePath}/${handlerName}`)
  }));

const groupByHandlerName = (handlerMap, { handlerName, handler }) => {
  (handlerMap[handlerName] = handlerMap[handlerName] || []).push(handler);

  return handlerMap;
};

module.exports = () =>
  getFileNames('../widgets')
    .map(getHandlerFilePath)
    .flatMap(getHandlers)
    .reduce(groupByHandlerName, { ready: [] });
