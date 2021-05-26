import AbstractView from './abstract.js';
import {getUserRankName} from '../utils/film.js';

const createUserRankTemplate = (filmCount) => {
  const userRankName = getUserRankName(filmCount);

  return `<section class="header__profile profile">
    ${userRankName ? `<p class="profile__rating">${userRankName}</p>` : ''}
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`;
};

export default class UserRank extends AbstractView {
  constructor(watchedFilmCount) {
    super();
    this._watchedFilmCount = watchedFilmCount;
  }

  getTemplate() {
    return createUserRankTemplate(this._watchedFilmCount);
  }
}
