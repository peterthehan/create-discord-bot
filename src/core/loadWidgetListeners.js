const getWidgetHandlerMap = require("./getWidgetHandlerMap");

const runHandlers = (handlers, ...eventArguments) =>
  handlers.forEach((handler) => handler(...eventArguments));

module.exports = (client) => {
  const { ready, ...widgetHandlerMap } = getWidgetHandlerMap();

  process.on("unhandledRejection", console.warn);
  client.once("ready", () => runHandlers(ready, client));

  Object.keys(widgetHandlerMap).forEach((handlerName) =>
    client.on(handlerName, (...eventArguments) =>
      runHandlers(widgetHandlerMap[handlerName], ...eventArguments)
    )
  );
};
