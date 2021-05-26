import FilmView from '../view/film.js';
import PopupView from '../view/popup.js';
import {render, RenderPosition, replace, remove} from '../utils/render.js';
import {UserAction, UpdateType, State} from '../const.js';

const Mode = {
  CLOSED: 'CLOSED',
  OPENED: 'OPENED',
};

export default class Film {
  constructor(filmListContainer, changeData, changeMode, commentsModel, api) {
    this._filmListContainer = filmListContainer;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._filmComponent = null;
    this._popupComponent = null;
    this._mode = Mode.CLOSED;

    this._commentsModel = commentsModel;
    this._api = api;

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

  resetView() {
    if (this._mode !== Mode.CLOSED) {
      this._removePopup();
    }
  }

  destroy() {
    remove(this._filmComponent);
  }

  setViewState(state, comment) {
    const resetFormState = () => {
      this._popupComponent.updateState({
        isDisabled: false,
      });
    };

    switch (state) {
      case State.SAVING:
        this._popupComponent.updateState({
          isDisabled: true,
        });
        break;
      case State.DELETING:
        this._popupComponent.disableDeleteCommentButton(comment);
        break;
      case State.ABORTING_SAVING:
        this._popupComponent.shake(resetFormState);
        break;
      case State.ABORTING_DELETING:
        this._popupComponent.enableDeleteCommentElement(comment);
        break;
    }
  }

  _renderFilmPopup() {
    document.body.classList.add('hide-overflow');
    this._popupComponent = new PopupView(this._film, this._commentsModel);
    document.addEventListener('keydown', this._escKeyDownHandler);

    this._changeMode();
    this._mode = Mode.OPENED;

    this._popupComponent.setCloseClickHandler(this._removePopup);
    this._popupComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._popupComponent.setWatchlistClickHandler(this._handleWatchlistClick);
    this._popupComponent.setWatchedClickHandler(this._handleWatchedClick);
    this._popupComponent.setDeleteCommentClickHandler(this._handleDeleteCommentClick);
    this._popupComponent.setFormSubmitHandler(this._handleFormSubmit);

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._commentsModel.addObserver(this._handleModelEvent);

    render(document.body, this._popupComponent, RenderPosition.BEFOREEND);
  }

  _removePopup() {
    remove(this._popupComponent);
    this._commentsModel.removeObserver(this._handleModelEvent);
    document.body.classList.remove('hide-overflow');
    document.removeEventListener('keydown', this._escKeyDownHandler);
    this._mode = Mode.CLOSED;
  }

  _handleModelEvent() {
    const prevPopupScrollHeight = this._popupComponent.getElement().scrollHeight;

    this._removePopup();
    this._renderFilmPopup();

    this._popupComponent.getElement().scrollTop = prevPopupScrollHeight;
  }

  _handleFilmCardItemsClick() {
    this._api.getComments(this._film.id)
      .then((comments) => {
        this._commentsModel.set(UpdateType.INIT, comments);
        this._renderFilmPopup();
      })
      .catch(() => {
        this._commentsModel.set(UpdateType.INIT, []);
        this._renderFilmPopup();
      });
  }

  _escKeyDownHandler(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this._removePopup();
    }
  }

  _handleFavoriteClick() {
    this._changeData(
      UserAction.UPDATE_FILM,
      this._mode === Mode.CLOSED ? UpdateType.MINOR : UpdateType.PATCH,
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
      this._mode === Mode.CLOSED ? UpdateType.MINOR : UpdateType.PATCH,
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
      this._mode === Mode.CLOSED ? UpdateType.MINOR : UpdateType.PATCH,
      Object.assign(
        {},
        this._film,
        {
          watched: !this._film.watched,
        },
      ),
    );
  }

  _handleDeleteCommentClick(commentId) {
    this._changeData(
      UserAction.DELETE_COMMENT,
      UpdateType.PATCH,
      Object.assign(
        {},
        this._film,
        {
          comments: this._film.comments.filter((filmCommentId) => filmCommentId !== commentId),
        },
      ),
      commentId,
    );
  }

  _handleFormSubmit(newComment) {
    this._changeData(
      UserAction.ADD_COMMENT,
      UpdateType.PATCH,
      this._film,
      newComment,
    );
  }
}
