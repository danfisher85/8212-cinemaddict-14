import {NAMES, COMMENTS, EMOJIS} from '../const.js';
import {getRandomInteger, getRandomArrayElement, getUniqId, getRandomDate} from '../utils.js';

const COMMENT_COUNT = getRandomInteger(0, 5);

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
  return new Array(COMMENT_COUNT).fill().map(() => generateComment(getUniqId()));
};
