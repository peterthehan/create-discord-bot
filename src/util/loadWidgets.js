const fs = require('fs');
const path = require('path');

const getFileNames = filePath =>
  fs
    .readdirSync(path.resolve(__dirname, filePath))
    .map(fileName => fileName.replace('.js', ''));

const getWidgetHandlers = () => {
  return getFileNames('../widgets')
    .flatMap(widgetName => {
      const widgetHandlerFilePath = `../widgets/${widgetName}/handlers`;

      return getFileNames(widgetHandlerFilePath).map(widgetHandlerName => ({
        widgetHandlerName,
        widgetHandler: require(`${widgetHandlerFilePath}/${widgetHandlerName}`)
      }));
    })
    .reduce((widgetHandlers, { widgetHandlerName, widgetHandler }) => {
      if (!(widgetHandlerName in widgetHandlers)) {
        widgetHandlers[widgetHandlerName] = [];
      }

      widgetHandlers[widgetHandlerName].push(widgetHandler);

      return widgetHandlers;
    }, {});
};

const loadHandler = handler => require(`../handlers/${handler}`);

module.exports = client => {
  const widgetHandlers = getWidgetHandlers();

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
