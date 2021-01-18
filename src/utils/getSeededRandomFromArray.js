import splitToChunks from "utils/splitToChunks";

const getSeededRandomFromArray = (array, seedString, numberOfResults = 4) => {
  const seededResults = [];

  const arrayBuckets = splitToChunks(array, numberOfResults);
  const stringBuckets = splitToChunks(seedString.split(""), numberOfResults);

  stringBuckets.forEach((bucket, idx) => {
    const sum = bucket.reduce((sum, char) => (sum += char.charCodeAt()), 0);
    const targetArrayBucket = arrayBuckets[idx];
    const selectedIdx = sum % targetArrayBucket.length;
    seededResults.push(targetArrayBucket[selectedIdx]);
  });

  return seededResults;
};

export default getSeededRandomFromArray;
