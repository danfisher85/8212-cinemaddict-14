import FilmView from '../view/film-card.js';
import PopupView from '../view/popup.js';
import {render, RenderPosition} from '../utils/render.js';

export default class Film {
  constructor(filmListContainer) {
    this._filmListContainer = filmListContainer;

    this._filmComponent = null;
    this._popupComponent = null;

    this._handleItemsClick = this._handleItemsClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init(film, comments) {
    this._film = film;
    this._comments = comments;

    this._filmComponent = new FilmView(film);
    this._popupComponent = new PopupView(film, comments);

    this._filmComponent.setItemsClickHandler(this._handleItemsClick);

    render(this._filmListContainer, this._filmComponent, RenderPosition.BEFOREEND);
  }

  _closePopupHandler() { // closePopupHandler
    document.body.classList.remove('hide-overflow');
    document.body.removeChild(this._popupComponent.getElement());
  }

  _handleItemsClick() { // setItemsClickHandler
    document.body.classList.add('hide-overflow');

    this._popupComponent.setCloseClickHandler(this._closePopupHandler);
    document.addEventListener('keydown', this._escKeyDownHandler);

    document.body.appendChild(this._popupComponent.getElement());
  }

  // _handleClosePopup() { // setCloseClickHandler
  //   closePopupHandler(this._popupComponent);
  // }

  _escKeyDownHandler(evt) { // onEscKeyDown
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this._closePopupHandler();
      document.removeEventListener('keydown', this._escKeyDownHandler);
    }
  }
}
