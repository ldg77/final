export default (...args: any | any[]) =>
  fetch.apply(null, args).then((res) => res.json());
