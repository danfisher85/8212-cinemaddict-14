import FilmView from '../view/film-card.js';
import PopupView from '../view/popup.js';
import {render, RenderPosition, replace, remove} from '../utils/render.js';
import {UserAction, UpdateType} from '../const.js';

const Mode = {
  CLOSED: 'CLOSED',
  OPENED: 'OPENED',
};

export default class Film {
  constructor(filmListContainer, changeData, changeMode, comments) {
    this._filmListContainer = filmListContainer;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._filmComponent = null;
    this._popupComponent = null;
    this._mode = Mode.CLOSED;

    this._comments = comments;

    this._handleFilmCardItemsClick = this._handleFilmCardItemsClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleWatchlistClick = this._handleWatchlistClick.bind(this);
    this._handleWatchedClick = this._handleWatchedClick.bind(this);

    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._removePopup = this._removePopup.bind(this);

    this._handleDeleteCommentClick = this._handleDeleteCommentClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
  }

  init(film) {
    this._film = film;

    const prevFilmComponent = this._filmComponent;

    this._filmComponent = new FilmView(film);

    this._filmComponent.setItemsClickHandler(this._handleFilmCardItemsClick);
    this._filmComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._filmComponent.setWatchlistClickHandler(this._handleWatchlistClick);
    this._filmComponent.setWatchedClickHandler(this._handleWatchedClick);

    if (prevFilmComponent === null) {
      render(this._filmListContainer, this._filmComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._filmListContainer.getElement().contains(prevFilmComponent.getElement())) {
      replace(this._filmComponent, prevFilmComponent);
    }

    remove(prevFilmComponent);
  }

  _handleFavoriteClick() {
    this._changeData(
      UserAction.UPDATE_FILM,
      UpdateType.PATCH,
      Object.assign(
        {},
        this._film,
        {
          favorite: !this._film.favorite,
        },
      ),
    );
  }

  _handleWatchlistClick() {
    this._changeData(
      UserAction.UPDATE_FILM,
      UpdateType.PATCH,
      Object.assign(
        {},
        this._film,
        {
          watchListed: !this._film.watchListed,
        },
      ),
    );
  }

  _handleWatchedClick() {
    this._changeData(
      UserAction.UPDATE_FILM,
      UpdateType.PATCH,
      Object.assign(
        {},
        this._film,
        {
          watched: !this._film.watched,
        },
      ),
    );
  }

  resetView() {
    if (this._mode !== Mode.CLOSED) {
      this._removePopup();
    }
  }

  destroy() {
    remove(this._filmComponent);
  }

  _handleFilmCardItemsClick() {
    document.body.classList.add('hide-overflow');

    this._popupComponent = new PopupView(this._film, this._comments);
    document.addEventListener('keydown', this._escKeyDownHandler);

    this._changeMode();
    this._mode = Mode.OPENED;

    this._popupComponent.setCloseClickHandler(this._removePopup);
    this._popupComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._popupComponent.setWatchlistClickHandler(this._handleWatchlistClick);
    this._popupComponent.setWatchedClickHandler(this._handleWatchedClick);
    this._popupComponent.setDeleteCommentClickHandler(this._handleDeleteCommentClick);
    this._popupComponent.setFormSubmitHandler(this._handleFormSubmit);

    render(document.body, this._popupComponent, RenderPosition.BEFOREEND);
  }

  _removePopup() {
    remove(this._popupComponent);
    document.body.classList.remove('hide-overflow');
    document.removeEventListener('keydown', this._escKeyDownHandler);
    this._mode = Mode.CLOSED;
  }

  _escKeyDownHandler(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this._removePopup();
    }
  }

  _handleDeleteCommentClick(id) {
    this._changeData(
      UserAction.DELETE_COMMENT,
      UpdateType.PATCH,
      Object.assign(
        {},
        this._film,
        {
          comments: this._film.comments.filter((item) => item !== id),
        },
      ),
      id,
    );
  }

  _handleFormSubmit(newComment) {

    const updatedComments = this._film.comments;
    updatedComments.push(newComment.id);

    this._changeData(
      UserAction.ADD_COMMENT,
      UpdateType.PATCH,
      Object.assign(
        {},
        this._film,
        {
          comments: updatedComments,
        },
      ),
      newComment,
    );
  }
}
