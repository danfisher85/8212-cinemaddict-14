import he from 'he';
import {EMOJIS} from '../const.js';
import {getFilmPopupDate, getCommentHumaziedDate, getPluralized, getHumanizedDuration} from '../utils/film.js';
import Smart from './smart.js';

const DeleteButtonStatus = {
  DELETING: 'Deleting…',
  DELETE: 'Delete',
};

const SHAKE_ANIMATION_TIMEOUT = 600;

const createEmojiTemplate = (currentEmoji, isDisabled) => {
  return EMOJIS.map((emoji) => `<input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emoji}" value="${emoji}" ${currentEmoji === emoji ? 'checked' : ''} ${isDisabled ? 'disabled' : ''}>
    <label class="film-details__emoji-label" for="emoji-${emoji}">
      <img src="./images/emoji/${emoji}.png" width="30" height="30" alt="emoji">
    </label>`).join('');
};

const createCommentTemplate = (comments) => {
  return Object.values(comments).map(({id, author, comment, emoji, date}) => `<li class="film-details__comment">
    <span class="film-details__comment-emoji">
      <img src="./images/emoji/${emoji}.png" width="55" height="55" alt="emoji-${emoji}">
    </span>
    <div>
      <p class="film-details__comment-text">${he.encode(comment)}</p>
      <p class="film-details__comment-info">
        <span class="film-details__comment-author">${author}</span>
        <span class="film-details__comment-day">${getCommentHumaziedDate(date)}</span>
        <button class="film-details__comment-delete" data-id="${id}">Delete</button>
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
    country,
    description,
    watchListed,
    watched,
    favorite,
    emojiState,
    commentState,
    isComments,
    isDisabled,
    isDeleting,
  } = state;

  const emojiTemplate = createEmojiTemplate(emojiState, isDisabled);
  const commentsTemplate = createCommentTemplate(isComments, isDisabled, isDeleting);
  const commentCount = isComments.length;

  return `<section class="film-details">
    <form class="film-details__inner" action="" method="get">
      <div class="film-details__top-container">
        <div class="film-details__close">
          <button class="film-details__close-btn" type="button">close</button>
        </div>
        <div class="film-details__info-wrap">
          <div class="film-details__poster">
            <img class="film-details__poster-img" src="${poster}" alt="${title}">

            <p class="film-details__age">${audienceRating}+</p>
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
                <td class="film-details__cell">${getFilmPopupDate(releaseDate)}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Runtime</td>
                <td class="film-details__cell">${getHumanizedDuration(duration)}</td>
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
          <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${watchListed ? ' checked' : ''}>
          <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist"></label>

          <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${watched ? ' checked' : ''}>
          <label for="watched" class="film-details__control-label film-details__control-label--watched"></label>

          <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${favorite ? ' checked': ''}>
          <label for="favorite" class="film-details__control-label film-details__control-label--favorite"></label>
        </section>
      </div>

      <div class="film-details__bottom-container">
        <section class="film-details__comments-wrap">
          <h3 class="film-details__comments-title">${getPluralized(commentCount, 'Comment')} <span class="film-details__comments-count">${commentCount}</span></h3>

          <ul class="film-details__comments-list">
            ${commentsTemplate}
          </ul>

          <div class="film-details__new-comment">
            <div class="film-details__add-emoji-label">
              ${emojiState ? `<img src="images/emoji/${emojiState}.png" width="55" height="55" alt="emoji-${emojiState}">`: ''}
            </div>

            <label class="film-details__comment-label">
              <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment" ${isDisabled ? 'disabled': ''}>${commentState ? commentState : ''}</textarea>
            </label>

            <div class="film-details__emoji-list ${isDisabled ? 'disabled' : ''}">
              ${emojiTemplate}
            </div>
          </div>
        </section>
      </div>
    </form>
  </section>`;
};

export default class Popup extends Smart {
  constructor(film, comments) {
    super();
    this._state = Popup.parseFilmDataToFilmState(film, comments);

    this._closeClickHandler = this._closeClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
    this._watchlistClickHandler = this._watchlistClickHandler.bind(this);
    this._watchedClickHandler = this._watchedClickHandler.bind(this);
    this._emojiClickHandler = this._emojiClickHandler.bind(this);
    this._deleteCommentClickHandler = this._deleteCommentClickHandler.bind(this);
    this._commentInputHandler = this._commentInputHandler.bind(this);
    this._formSubmitHandler = this._formSubmitHandler.bind(this);

    this._setInnerHandlers();
  }

  getTemplate() {
    return createPopupTemplate(this._state);
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

  setDeleteCommentClickHandler(callback) {
    this._callback.deleteCommentClick = callback;

    const commentsElement = this.getElement().querySelectorAll('.film-details__comment');
    commentsElement.forEach((element) => {
      element.querySelector('.film-details__comment-delete').addEventListener('click', this._deleteCommentClickHandler);
    });
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    document.addEventListener('keydown', this._formSubmitHandler);
  }

  disableDeleteCommentButton(commentId) {
    const deleteButton = this.getElement().querySelector(`[data-id="${commentId}"]`);
    deleteButton.disabled = true;
    deleteButton.textContent = DeleteButtonStatus.DELETING;
  }

  enableDeleteCommentElement(commentId) {
    const deleteButton = this.getElement().querySelector(`[data-id="${commentId}"]`);
    const parent = deleteButton.closest('.film-details__comment');
    parent.style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT}ms`;
    setTimeout(() => {
      parent.style.animation = '';
      deleteButton.disabled = false;
      deleteButton.textContent = DeleteButtonStatus.DELETE;
    }, SHAKE_ANIMATION_TIMEOUT);
  }

  restoreHandlers() {
    this.setCloseClickHandler(this._callback.closeClick);
    this.setFavoriteClickHandler(this._callback.favoriteClick);
    this.setWatchlistClickHandler(this._callback.watchlistClick);
    this.setWatchedClickHandler(this._callback.watchedClick);
    this.setDeleteCommentClickHandler(this._callback.deleteCommentClick);
    this.setFormSubmitHandler(this._callback.formSubmit);
    this._setInnerHandlers();
  }

  _setInnerHandlers() {
    this.getElement().querySelector('.film-details__emoji-list').addEventListener('change', this._emojiClickHandler);
    this.getElement().querySelector('.film-details__comment-input').addEventListener('input', this._commentInputHandler);
  }

  _closeClickHandler(evt) {
    evt.preventDefault();
    this._callback.closeClick();
  }

  _favoriteClickHandler() {
    this._callback.favoriteClick();

    this.updateState({
      favorite: !this._state.favorite,
    }, true);
  }

  _watchlistClickHandler() {
    this._callback.watchlistClick();

    this.updateState({
      watchListed: !this._state.watchListed,
    }, true);
  }

  _watchedClickHandler() {
    this._callback.watchedClick();

    this.updateState({
      watched: !this._state.watched,
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

  _commentInputHandler(evt) {
    evt.preventDefault();
    this.updateState({
      commentState: evt.target.value,
    }, true);
  }

  _deleteCommentClickHandler(evt) {
    evt.preventDefault();

    this._callback.deleteCommentClick(evt.target.dataset.id);
  }

  _formSubmitHandler(evt) {
    if (evt.ctrlKey && evt.key === 'Enter' || evt.metaKey && evt.key === 'Enter') {

      const newComment = {
        emoji: this._state.emojiState,
        comment: this._state.commentState,
      };

      if (!newComment.emoji || newComment.emoji === '' || newComment.comment === '' || newComment.emoji === null || newComment.comment === null) {
        return;
      }

      newComment.date = new Date();

      this._callback.formSubmit(Popup.parseFilmStateToFilmData(newComment));

      this._state.emojiState = null;
      this._state.commentState = null;
    }
  }

  static parseFilmDataToFilmState(film, comments) {
    return Object.assign(
      {},
      film,
      {
        isComments: comments.get(),
        isDisabled: false,
        isDeleting: false,
      },
    );
  }

  static parseFilmStateToFilmData(state) {
    state = Object.assign({}, state);

    delete state.commentState;
    delete state.emojiState;
    delete state.isComments;
    delete state.isDisabled;
    delete state.isDeleting;

    return state;
  }
}
