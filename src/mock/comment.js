import {NAMES, COMMENTS, EMOJIS} from '../const.js';
import {getRandomInteger, getRandomArrayElement, getUniqId} from '../utils.js';

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
  return new Array(getRandomInteger(0, 5)).fill().map(() => generateComment(getUniqId()));
};
