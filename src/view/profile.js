import AbstractView from './abstract.js';
import {getUserRankName} from '../utils/film.js';

const createProfileTemplate = (filmCount) => {
  const userRatingName = getUserRankName(filmCount);

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
