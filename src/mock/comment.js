const NAMES = [
  'Tim Macoveev',
  'John Doe',
  'Tim Burry',
  'Joe Johnson',
  'Jimmy Klarkson',
];

const COMMENTS = [
  'Interesting setting and a good cast',
  'Booooooooooring',
  'Very very old. Meh',
  'Almost two hours? Seriously?',
];

const EMOJIS = [
  'smile',
  'sleeping',
  'puke',
  'angry',
];

const getRandomInteger = (a = 0, b = 1, isFloor = true) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const num = lower + Math.random() * (upper - lower + 1);

  if (isFloor) {
    return Math.floor(num);
  }
  return +num.toFixed(1);
};

const getRandomArrayElement = (array) => {
  return array[getRandomInteger(0, array.length-1)];
};

const uniqId = function () {
  return '-' + Math.random().toString(36).substr(2, 9);
};

const generateComment = (id) => {
  return {
    id: `comment${id}`,
    author: `${getRandomArrayElement(NAMES)}`,
    comment: `${getRandomArrayElement(COMMENTS)}`,
    data: '2019/12/31 23:59',
    emoji: `${getRandomArrayElement(EMOJIS)}`,
  };
};

export const generateCommentsList = () => {
  return new Array(getRandomInteger(0, 5)).fill().map(() => generateComment(uniqId()));
};
