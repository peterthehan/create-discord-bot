module.exports = callbacks =>
  callbacks.reduce(
    (promiseChain, nextPromise) => promiseChain.then(nextPromise),
    Promise.resolve()
  );
