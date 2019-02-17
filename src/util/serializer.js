module.exports = asyncCallbacks => {
  return asyncCallbacks.reduce(
    (promiseChain, nextPromise) => promiseChain.then(nextPromise),
    Promise.resolve()
  );
};
