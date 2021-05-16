const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getRandomArrayElement = (array) => {
  return array[getRandomInteger(0, array.length-1)];
};

export const getRandomArraySize = (min, max, array, isToString = true, isCommaSeparator = false) => {
  if (isToString) {
    return new Array(getRandomInteger(min, max)).fill().map(() => getRandomArrayElement(array)).join(isCommaSeparator ? ', ' : ' ');
  }
  return new Array(getRandomInteger(min, max)).fill().map(() => getRandomArrayElement(array));
};
