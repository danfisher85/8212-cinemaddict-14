import {EMOJIS} from '../const.js';
import {formatFilmPopupDate} from '../utils.js';
import AbstractView from './abstract.js';

const createEmojiTemplate = () => {
  return EMOJIS.map((emoji) => `<input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emoji}" value="${emoji}">
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

const createPopupTemplate = (film = {}, commentItems) => {
  const {
    title = 'Made For Each Other',
    originalTitle = 'Made For Each Other',
    director = 'Alfred Hitchcock',
    writers = [
      'Anne Wigton',
      'Heinz Herald',
      'Richard Weil',
    ],
    actors = [
      'Robert De Niro',
      'Jack Nicholson',
      'Marlon Brando',
    ],
    audienceRating = '18+',
    poster = 'made-for-each-other.png',
    rating = 8.3,
    releaseDate = '01 April 1995',
    duration = '1h 36m',
    genres = [
      'Drama',
      'Film-Noir',
      'Mystery',
    ],
    comments = [],
    country = 'USA',
    description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra.',
    isWatchListed = false,
    isWatched = false,
    isFavorite = false,
  } = film;

  const watchListClassName = isWatchListed ? 'film-card__controls-item--active' : '';
  const watchedClassName = isWatched ? 'film-card__controls-item--active' : '';
  const favoriteClassName = isFavorite ? 'film-card__controls-item--active' : '';

  const emojiTemplate = createEmojiTemplate();
  const filmComments = commentItems.filter((comment) => {
    return comments.has(comment.id);
  });
  const commentsTemplate = createCommentTemplate(filmComments);
  const commentsElementCount = comments.size;


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
          <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist ${watchListClassName}">${isWatchListed ? 'Added to watchlist' : 'Add to watchlist'}</label>

          <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${isWatched ? ' checked' : ''}>
          <label for="watched" class="film-details__control-label film-details__control-label--watched ${watchedClassName}">${isWatched ? 'Already watched' : 'Mark as watched'}</label>

          <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${isFavorite ? ' checked': ''}>
          <label for="favorite" class="film-details__control-label film-details__control-label--favorite ${favoriteClassName}">${isFavorite ? 'Added to favorites' : 'Add to favorites'}</label>
        </section>
      </div>

      <div class="film-details__bottom-container">
        <section class="film-details__comments-wrap">
          <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${commentsElementCount}</span></h3>

          <ul class="film-details__comments-list">
            ${commentsTemplate}
          </ul>

          <div class="film-details__new-comment">
            <div class="film-details__add-emoji-label"></div>

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
  constructor(film, comments) {
    super();
    this._film = film;
    this._comments = comments;

    this._closeClickHandler = this._closeClickHandler.bind(this);
  }

  getTemplate() {
    return createPopupTemplate(this._film, this._comments);
  }

  _closeClickHandler(evt) {
    evt.preventDefault();
    this._callback.closeClick();
  }

  setCloseClickHandler(callback) {
    this._callback.closeClick = callback;

    this.getElement().querySelector('.film-details__close-btn').addEventListener('click', this._closeClickHandler);
  }
}
