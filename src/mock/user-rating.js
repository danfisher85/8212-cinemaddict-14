import {USER_RATINGS} from '../const.js';
import {getRandomArrayElement} from '../utils/common.js';

export const generateUserRating = () => {
  return {
    rating: getRandomArrayElement(USER_RATINGS),
    avatar: 'images/bitmap@2x.png',
  };
};
