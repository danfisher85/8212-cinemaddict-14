import AbstractView from './abstract.js';
import {UserRating} from '../const.js';

const createProfileTemplate = (filmCount) => {

  const getUserRatingName = () => {

    if (filmCount === 0) {
      return '';
    }

    if ((filmCount >= 1) && (filmCount) <= 10) {
      return UserRating.NOVICE;
    }

    if ((filmCount >= 11) && (filmCount) <= 20) {
      return UserRating.FAN;
    }

    return UserRating.MOVIE_BUFF;
  };

  const userRatingName = getUserRatingName();

  return `<section class="header__profile profile">
    ${userRatingName ? `<p class="profile__rating">${userRatingName}</p>` : ''}
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`;
};

export default class ProfileHeader extends AbstractView {
  constructor(watchedFilmCount) {
    super();
    this._watchedFilmCount = watchedFilmCount;
  }

  getTemplate() {
    return createProfileTemplate(this._watchedFilmCount);
  }
}
