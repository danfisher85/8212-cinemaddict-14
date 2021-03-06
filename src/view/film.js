import AbstractView from './abstract.js';
import {getTruncatedText, getFilmCardDate, getPluralized, getHumanizedDuration} from '../utils/film.js';

const MAX_DESCRIPTION_SIZE = 140;

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
    watchListed,
    watched,
    favorite,
  } = film;

  const watchListClassName = watchListed ? 'film-card__controls-item--active' : '';
  const watchedClassName = watched ? 'film-card__controls-item--active' : '';
  const favoriteClassName = favorite ? 'film-card__controls-item--active' : '';
  const commentCount = comments.length;

  return `<article class="film-card">
    <h3 class="film-card__title">${title}</h3>
    <p class="film-card__rating">${rating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${getFilmCardDate(releaseDate)}</span>
      <span class="film-card__duration">${getHumanizedDuration(duration)}</span>
      <span class="film-card__genre">${genres[0]}</span>
    </p>
    <img src="${poster}" alt="" class="film-card__poster">
    <p class="film-card__description">${getTruncatedText(description, MAX_DESCRIPTION_SIZE)}</p>
    <a class="film-card__comments">${commentCount} ${getPluralized(commentCount, 'comment')}</a>
    <div class="film-card__controls">
      <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${watchListClassName}" type="button">Add to watchlist</button>
      <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${watchedClassName}" type="button">Mark as watched</button>
      <button class="film-card__controls-item button film-card__controls-item--favorite ${favoriteClassName}" type="button">Mark as favorite</button>
    </div>
  </article>`;
};

export default class Film extends AbstractView {
  constructor(film) {
    super();
    this._film = film;

    this._itemsClickHandler = this._itemsClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
    this._watchlistClickHandler = this._watchlistClickHandler.bind(this);
    this._watchedClickHandler = this._watchedClickHandler.bind(this);
  }

  getTemplate() {
    return createFilmCardTemplate(this._film);
  }

  setItemsClickHandler(callback) {
    this._callback.itemsClick = callback;

    this.getElement().querySelector('.film-card__poster').addEventListener('click', this._itemsClickHandler);
    this.getElement().querySelector('.film-card__title').addEventListener('click', this._itemsClickHandler);
    this.getElement().querySelector('.film-card__comments').addEventListener('click', this._itemsClickHandler);
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector('.film-card__controls-item--favorite').addEventListener('click', this._favoriteClickHandler);
  }

  setWatchlistClickHandler(callback) {
    this._callback.watchlistClick = callback;
    this.getElement().querySelector('.film-card__controls-item--add-to-watchlist').addEventListener('click', this._watchlistClickHandler);
  }

  setWatchedClickHandler(callback) {
    this._callback.watchedClick = callback;
    this.getElement().querySelector('.film-card__controls-item--mark-as-watched').addEventListener('click', this._watchedClickHandler);
  }

  _itemsClickHandler(evt) {
    evt.preventDefault();
    this._callback.itemsClick();
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
  }

  _watchlistClickHandler(evt) {
    evt.preventDefault();
    this._callback.watchlistClick();
  }

  _watchedClickHandler(evt) {
    evt.preventDefault();
    this._callback.watchedClick();
  }
}
