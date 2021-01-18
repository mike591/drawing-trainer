const splitToChunks = (_array, parts = 3) => {
  const array = JSON.parse(JSON.stringify(_array));
  const result = [];
  for (let i = parts; i > 0; i--) {
    result.push(array.splice(0, Math.ceil(array.length / i)));
  }
  return result;
};

export default splitToChunks;
