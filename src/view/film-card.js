import {getTruncatedText, formatFilmCardDate, createElement} from '../utils.js';

const commentCountTemplate = (comments) => {
  let commentResult = '';
  const commentLength = comments.size;
  if (commentLength === 1) {
    commentResult = commentLength + ' comment';
  } else if (commentLength > 1) {
    commentResult = commentLength + ' comments';
  } else {
    commentResult = 'No comments';
  }

  return commentResult;
};

const createFilmCardTemplate = (film) => {
  const {
    title,
    poster,
    rating,
    releaseDate,
    duration,
    genres,
    description,
    comments,
    isWatchListed,
    isWatched,
    isFavorite,
  } = film;

  const watchListClassName = isWatchListed ? 'film-card__controls-item--active' : '';
  const watchedClassName = isWatched ? 'film-card__controls-item--active' : '';
  const favoriteClassName = isFavorite ? 'film-card__controls-item--active' : '';
  const commentCount = commentCountTemplate(comments);

  return `<article class="film-card">
    <h3 class="film-card__title">${title}</h3>
    <p class="film-card__rating">${rating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${formatFilmCardDate(releaseDate)}</span>
      <span class="film-card__duration">${duration}</span>
      <span class="film-card__genre">${genres[0]}</span>
    </p>
    <img src="${poster}" alt="" class="film-card__poster">
    <p class="film-card__description">${getTruncatedText(description)}</p>
    <a class="film-card__comments">${commentCount}</a>
    <div class="film-card__controls">
      <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${watchListClassName}" type="button">Add to watchlist</button>
      <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${watchedClassName}" type="button">Mark as watched</button>
      <button class="film-card__controls-item button film-card__controls-item--favorite ${favoriteClassName}" type="button">Mark as favorite</button>
    </div>
  </article>`;
};

export default class Film {
  constructor(film) {
    this._film = film;
    this._element = null;
  }

  getTemplate() {
    return createFilmCardTemplate(this._film);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
