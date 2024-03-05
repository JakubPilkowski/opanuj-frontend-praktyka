export const performanceFetchApi = new Proxy(fetch, {
  apply(target, thisArg, args) {
    const start = performance.now();
    return target.apply(thisArg, args).then((response) => {
      const end = performance.now();
      console.log('Request time:', end - start, 'ms');
      return response;
    });
  },
});
