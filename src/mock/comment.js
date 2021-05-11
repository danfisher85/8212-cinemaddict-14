import {nanoid} from 'nanoid';
import {NAMES, COMMENTS, EMOJIS} from '../const.js';
import {getRandomInteger, getRandomArrayElement} from '../utils/common.js';
import {getRandomDate} from '../utils/film.js';

const generateComment = () => {
  return {
    id: nanoid(),
    author: getRandomArrayElement(NAMES),
    comment: getRandomArrayElement(COMMENTS),
    date: getRandomDate(new Date(2020, 12, 31), new Date()),
    emoji: getRandomArrayElement(EMOJIS),
  };
};

export const generateComments = () => {
  return new Array(getRandomInteger(0, 5)).fill().map(() => generateComment());
};
