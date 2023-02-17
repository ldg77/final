function getWindowSize() {
  const { innerWidth: width, innerHeight: height } = global.window;
  return {
    width,
    height,
  };
}
export default getWindowSize;
