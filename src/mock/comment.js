import {NAMES, COMMENTS, EMOJIS} from '../const.js';
import {getRandomInteger, getRandomArrayElement, getUniqId, getRandomDate} from '../utils.js';

const generateComment = (id) => {
  return {
    id: `comment${id}`,
    author: `${getRandomArrayElement(NAMES)}`,
    comment: `${getRandomArrayElement(COMMENTS)}`,
    date: getRandomDate(new Date(2020, 12, 31), new Date()),
    emoji: `${getRandomArrayElement(EMOJIS)}`,
  };
};

export const generateCommentsList = () => {
  return new Array(getRandomInteger(0, 5)).fill().map(() => generateComment(getUniqId()));
};
