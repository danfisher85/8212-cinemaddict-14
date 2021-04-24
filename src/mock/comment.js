import {nanoid} from 'nanoid';
import {NAMES, COMMENTS, EMOJIS} from '../const.js';
import {getRandomArrayElement} from '../utils/common.js';
import {getRandomDate} from '../utils/film.js';

export const generateComment = () => {
  return {
    id: nanoid(),
    author: `${getRandomArrayElement(NAMES)}`,
    comment: `${getRandomArrayElement(COMMENTS)}`,
    date: getRandomDate(new Date(2020, 12, 31), new Date()),
    emoji: `${getRandomArrayElement(EMOJIS)}`,
  };
};
