export const getRandomInteger = (a = 0, b = 1, isFloor = true) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const num = lower + Math.random() * (upper - lower + 1);

  if (isFloor) {
    return Math.floor(num);
  }
  return +num.toFixed(1);
};

export const getRandomArrayElement = (array) => {
  return array[getRandomInteger(0, array.length-1)];
};

export const getUniqId = function () {
  return '-' + Math.random().toString(36).substr(2, 9);
};

export const getHumanizedDuration = (minsTotal) => {
  const hours = Math.floor(minsTotal / 60);
  const mins = minsTotal % 60;
  const hoursOutput = hours ? hours + 'h ' : '';

  return hoursOutput + mins + 'm';
};

export const getRandomArraySize = (min, max, array, isToString = true) => {
  if (isToString) {
    return new Array(getRandomInteger(min, max)).fill().map(() => getRandomArrayElement(array)).join(' ');
  }
  return new Array(getRandomInteger(min, max)).fill().map(() => getRandomArrayElement(array));
};
