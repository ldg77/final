const fetcher = (...args: any | any[]) =>
  fetch.apply(null, args).then((res) => res.json());

export default fetcher;
