const getRandomFromArray = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)];
};

export default getRandomFromArray;
