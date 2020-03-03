const fs = require('fs');
const path = require('path');

const getFileNames = filePath =>
  fs
    .readdirSync(path.resolve(__dirname, filePath))
    .map(fileName => fileName.replace('.js', ''));

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

const getWidgetHandlerMap = () =>
  getFileNames('../widgets')
    .map(getHandlerFilePath)
    .flatMap(getHandlers)
    .reduce(groupByHandlerName, { ready: [] });

const loadHandler = handler => require(`../handlers/${handler}`);

module.exports = client => {
  const widgetHandlers = getWidgetHandlerMap();

  process.on('unhandledRejection', console.warn);
  getFileNames('../handlers').forEach(handler => {
    const widgetHandler =
      handler in widgetHandlers ? widgetHandlers[handler] : [];

    if (handler === 'ready') {
      client.once(handler, () => loadHandler(handler)(client, widgetHandler));
    } else {
      client.on(handler, (...eventArguments) =>
        loadHandler(handler)(...eventArguments, widgetHandler)
      );
    }
  });
};
