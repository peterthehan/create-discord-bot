const getWidgetHandlerMap = require('./getWidgetHandlerMap');

const runHandlers = (handlers, ...eventArguments) =>
  handlers.forEach(handler => handler(...eventArguments));

module.exports = client => {
  const widgetHandlerMap = getWidgetHandlerMap();

  process.on('unhandledRejection', console.warn);
  client.once('ready', () => runHandlers(widgetHandlerMap.ready, client));

  Object.keys(widgetHandlerMap)
    .filter(handlerName => handlerName !== 'ready')
    .forEach(handlerName =>
      client.on(handlerName, (...eventArguments) =>
        runHandlers(widgetHandlerMap[handlerName], ...eventArguments)
      )
    );
};
