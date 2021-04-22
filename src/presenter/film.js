import FilmView from '../view/film-card.js';
import PopupView from '../view/popup.js';
import {render, RenderPosition, replace, remove} from '../utils/render.js';

const Mode = {
  CLOSED: 'CLOSED',
  OPENED: 'OPENED',
};

export default class Film {
  constructor(filmListContainer, changeData, changeMode) {
    this._filmListContainer = filmListContainer;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._filmComponent = null;
    this._popupComponent = null;
    this._mode = Mode.CLOSED;

    this._handleFilmCardItemsClick = this._handleFilmCardItemsClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleWatchlistClick = this._handleWatchlistClick.bind(this);
    this._handleWatchedClick = this._handleWatchedClick.bind(this);

    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._removePopup = this._removePopup.bind(this);
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
      Object.assign(
        {},
        this._film,
        {
          isFavorite: !this._film.isFavorite,
        },
      ),
    );
  }

  _handleWatchlistClick() {
    this._changeData(
      Object.assign(
        {},
        this._film,
        {
          isWatchListed: !this._film.isWatchListed,
        },
      ),
    );
  }

  _handleWatchedClick() {
    this._changeData(
      Object.assign(
        {},
        this._film,
        {
          isWatched: !this._film.isWatched,
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

  _handleFilmCardItemsClick() { // setItemsClickHandler
    document.body.classList.add('hide-overflow');

    this._popupComponent = new PopupView(this._film);
    document.addEventListener('keydown', this._escKeyDownHandler);

    this._changeMode();
    this._mode = Mode.OPENED;

    this._popupComponent.setCloseClickHandler(this._removePopup);
    this._popupComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._popupComponent.setWatchlistClickHandler(this._handleWatchlistClick);
    this._popupComponent.setWatchedClickHandler(this._handleWatchedClick);

    render(document.body, this._popupComponent, RenderPosition.BEFOREEND);
  }

  _removePopup() {
    remove(this._popupComponent);
    document.body.classList.remove('hide-overflow');
    document.removeEventListener('keydown', this._escKeyDownHandler);
    this._mode = Mode.CLOSED;
  }

  _escKeyDownHandler(evt) { // onEscKeyDown
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this._removePopup();
    }
  }
}
