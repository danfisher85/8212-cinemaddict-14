import {EMOJIS} from '../const.js';
import {formatFilmPopupDate} from '../utils/film.js';
import AbstractView from './abstract.js';

const createEmojiTemplate = (currentEmoji) => {
  return EMOJIS.map((emoji) => `<input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emoji}" value="${emoji}" ${currentEmoji === emoji ? `checked` : ``}>
    <label class="film-details__emoji-label" for="emoji-${emoji}">
      <img src="./images/emoji/${emoji}.png" width="30" height="30" alt="emoji">
    </label>`).join('');
};

const createCommentTemplate = (comments) => {
  return Object.values(comments).map(({id, author, comment, emoji, date}) => `<li class="film-details__comment" id="${id}">
    <span class="film-details__comment-emoji">
      <img src="./images/emoji/${emoji}.png" width="55" height="55" alt="emoji-${emoji}">
    </span>
    <div>
      <p class="film-details__comment-text">${comment}</p>
      <p class="film-details__comment-info">
        <span class="film-details__comment-author">${author}</span>
        <span class="film-details__comment-day">${date}</span>
        <button class="film-details__comment-delete">Delete</button>
      </p>
    </div>
  </li>`).join('');
};

const createPopupTemplate = (state) => {
  const {
    title,
    originalTitle,
    director,
    writers,
    actors,
    audienceRating,
    poster,
    rating,
    releaseDate,
    duration,
    genres,
    comments,
    country,
    description,
    watchListed,
    watched,
    favorite,
    isWatchListed,
    isWatched,
    isFavorite,
    commentEmoji,
    emojiState,
  } = state;

  const emojiTemplate = createEmojiTemplate(emojiState);
  const commentsTemplate = createCommentTemplate(comments);
  const commentsElementCount = comments.length;


  return `<section class="film-details">
    <form class="film-details__inner" action="" method="get">
      <div class="film-details__top-container">
        <div class="film-details__close">
          <button class="film-details__close-btn" type="button">close</button>
        </div>
        <div class="film-details__info-wrap">
          <div class="film-details__poster">
            <img class="film-details__poster-img" src="${poster}" alt="${title}">

            <p class="film-details__age">${audienceRating}</p>
          </div>

          <div class="film-details__info">
            <div class="film-details__info-head">
              <div class="film-details__title-wrap">
                <h3 class="film-details__title">${title}</h3>
                <p class="film-details__title-original">${originalTitle}</p>
              </div>

              <div class="film-details__rating">
                <p class="film-details__total-rating">${rating}</p>
              </div>
            </div>

            <table class="film-details__table">
              <tr class="film-details__row">
                <td class="film-details__term">Director</td>
                <td class="film-details__cell">${director}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Writers</td>
                <td class="film-details__cell">${writers}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Actors</td>
                <td class="film-details__cell">${actors}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Release Date</td>
                <td class="film-details__cell">${formatFilmPopupDate(releaseDate)}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Runtime</td>
                <td class="film-details__cell">${duration}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Country</td>
                <td class="film-details__cell">${country}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Genres</td>
                <td class="film-details__cell">
                  <span class="film-details__genre">${genres.join('</span><span class="film-details__genre">')}</span>
                </td>
              </tr>
            </table>

            <p class="film-details__film-description">
              ${description}
            </p>
          </div>
        </div>

        <section class="film-details__controls">
          <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${isWatchListed ? ' checked' : ''}>
          <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist"></label>

          <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${isWatched ? ' checked' : ''}>
          <label for="watched" class="film-details__control-label film-details__control-label--watched"></label>

          <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${isFavorite ? ' checked': ''}>
          <label for="favorite" class="film-details__control-label film-details__control-label--favorite"></label>
        </section>
      </div>

      <div class="film-details__bottom-container">
        <section class="film-details__comments-wrap">
          <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${commentsElementCount}</span></h3>

          <ul class="film-details__comments-list">
            ${commentsTemplate}
          </ul>

          <div class="film-details__new-comment">
            <div class="film-details__add-emoji-label">
              ${emojiState ? `<img src="images/emoji/${emojiState}.png" width="55" height="55" alt="emoji-${emojiState}">`: ''}
            </div>

            <label class="film-details__comment-label">
              <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
            </label>

            <div class="film-details__emoji-list">
              ${emojiTemplate}
            </div>
          </div>
        </section>
      </div>
    </form>
  </section>`;
};

export default class Popup extends AbstractView {
  constructor(film) {
    super();
    this._film = film;
    this._state = Popup.parseFilmDataToFilmState(film);

    this._closeClickHandler = this._closeClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
    this._watchlistClickHandler = this._watchlistClickHandler.bind(this);
    this._watchedClickHandler = this._watchedClickHandler.bind(this);
    this._emojiClickHandler = this._emojiClickHandler.bind(this);
    this._formSubmitHandler = this._formSubmitHandler.bind(this);

    this._setInnerHandlers();
  }

  getTemplate() {
    return createPopupTemplate(this._state);
  }

  _closeClickHandler(evt) {
    evt.preventDefault();
    this._callback.closeClick();
  }

  _favoriteClickHandler() {
    this._callback.favoriteClick();

    this.updateState({
      isFavorite: !this._state.isFavorite,
    }, true);
  }

  _watchlistClickHandler() {
    this._callback.watchlistClick();

    this.updateState({
      isWatchListed: !this._state.isWatchListed,
    }, true);
  }

  _watchedClickHandler() {
    this._callback.watchedClick();

    this.updateState({
      isWatched: !this._state.isWatched,
    }, true);
  }

  _emojiClickHandler(evt) {
    if (evt.target.tagName !== 'INPUT') {
      return;
    }

    this.updateState({
      emojiState: evt.target.value,
    });
  }

  updateState(update, justStateUpdate) {
    if (!update) {
      return;
    }

    this._state = Object.assign(
      {},
      this._state,
      update,
    );

    if (justStateUpdate) {
      return;
    }

    this.updateElement();
  }

  updateElement() {
    const prevElement = this.getElement();
    const parent = prevElement.parentElement;
    const prevScrollPosition = prevElement.scrollTop;
    this.removeElement();

    const newElement = this.getElement();

    parent.replaceChild(newElement, prevElement);
    newElement.scrollTop = prevScrollPosition;

    this.restoreHandlers();
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this.setCloseClickHandler(this._callback.closeClick);
    this.setFavoriteClickHandler(this._callback.favoriteClick);
    this.setWatchlistClickHandler(this._callback.watchlistClick);
    this.setWatchedClickHandler(this._callback.watchedClick);
    this.setFormSubmitHandler(this._callback.formSubmit);
  }

  _setInnerHandlers() {
    this.getElement().querySelector('.film-details__emoji-list').addEventListener('change', this._emojiClickHandler);
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit(Popup.parseFilmStateToFilmData(this._state));
  }

  setCloseClickHandler(callback) {
    this._callback.closeClick = callback;

    this.getElement().querySelector('.film-details__close-btn').addEventListener('click', this._closeClickHandler);
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector('.film-details__control-label--favorite').addEventListener('click', this._favoriteClickHandler);
  }

  setWatchlistClickHandler(callback) {
    this._callback.watchlistClick = callback;
    this.getElement().querySelector('.film-details__control-label--watchlist').addEventListener('click', this._watchlistClickHandler);
  }

  setWatchedClickHandler(callback) {
    this._callback.watchedClick = callback;
    this.getElement().querySelector('.film-details__control-label--watched').addEventListener('click', this._watchedClickHandler);
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().querySelector('form').addEventListener('submit', this._formSubmitHandler);
  }

  static parseFilmDataToFilmState(film) {
    return Object.assign(
      {},
      film,
      {
        isWatchListed: film.watchListed,
        isWatched: film.watched,
        isFavorite: film.favorite,
        emojiState: film.commentEmoji,
      },
    );
  }

  static parseFilmStateToFilmData(state) {
    state = Object.assign({}, state);

    state.watchListed = state.isWatchListed;
    state.watched = state.isWatched;
    state.favorite = state.isFavorite;

    delete state.isWatchListed;
    delete state.isWatched;
    delete state.isFavorite;
    delete state.emojiState;

    return state;
  }
}
