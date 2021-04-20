import SortingView from '../view/sorting.js';
import FilmView from '../view/film-card.js';
import NoFilmView from '../view/no-film.js';
import FilmHolderView from '../view/films.js';
import FilmsListView from '../view/films-list.js';
import FilmsListInnerView from '../view/films-list-inner.js';
import ShowMoreView from '../view/show-more.js';
import FilmsListTopView from '../view/films-list-top.js';
import FilmsListCommentedView from '../view/films-list-commented.js';
import PopupView from '../view/popup.js';
import {render, RenderPosition, remove} from '../utils/render.js';

const FILM_COUNT_PER_STEP = 5;

export default class FilmList {
  constructor(filmListContainer) {
    this._filmListContainer = filmListContainer;

    this._filmHolder = new FilmHolderView();
    this._filmListComponent = new FilmsListView();
    this._filmListInnerComponent = new FilmsListInnerView();
    this._sortComponent = new SortingView();
    this._noFilmComponent = new NoFilmView();
  }

  init(films, comments) {
    this._films = films.slice();
    this._comments = comments.slice();

    render(this._filmListContainer, this._filmHolder, RenderPosition.BEFOREEND); // .films
    render(this._filmHolder, this._filmListComponent, RenderPosition.BEFOREEND); // .films-list
    render(this._filmListComponent, this._filmListInnerComponent, RenderPosition.BEFOREEND); // .films-list__container

    this._renderFilmList();
  }

  _renderSort() {
    render(this._filmHolder, this._sortComponent, RenderPosition.BEFOREBEGIN);
  }

  _renderFilm(film, comments) {
    const filmComponent = new FilmView(film);

    const closePopupHandler = (element) => {
      document.body.classList.remove('hide-overflow');
      document.body.removeChild(element.getElement());
    };

    filmComponent.setItemsClickHandler(() => {
      document.body.classList.add('hide-overflow');
      const filmPopup = new PopupView(film, this._comments);

      filmPopup.setCloseClickHandler(() => {
        closePopupHandler(filmPopup);
      });

      const onEscKeyDown = (evt) => {
        if (evt.key === 'Escape' || evt.key === 'Esc') {
          evt.preventDefault();
          closePopupHandler(filmPopup);
          document.removeEventListener('keydown', onEscKeyDown);
        }
      };
      document.addEventListener('keydown', onEscKeyDown);

      document.body.appendChild(filmPopup.getElement());
    });

    render(this._filmListInnerComponent, filmComponent, RenderPosition.BEFOREEND);
  }

  _renderFilms(from, to) {
    this._films
      .slice(from, to)
      .forEach((film) => this._renderFilm(film));
  }

  _renderNoFilms() {
    render(this._filmListContainer, this._noFilmComponent, RenderPosition.BEFOREEND);
  }

  _renderShowMoreButton() {
    let renderedFilmsCount = FILM_COUNT_PER_STEP;

    const showMoreButtonComponent = new ShowMoreView();
    render(this._filmListComponent, showMoreButtonComponent, RenderPosition.BEFOREEND);

    showMoreButtonComponent.setClickHandler(() => {
      this._films
        .slice(renderedFilmsCount, renderedFilmsCount + FILM_COUNT_PER_STEP)
        .forEach((film) => this._renderFilm(film));

      renderedFilmsCount += FILM_COUNT_PER_STEP;

      if (renderedFilmsCount >= this._films.length) {
        remove(showMoreButtonComponent);
      }
    });
  }

  _renderFilmItems() {
    this._renderFilms(0, Math.min(this._films.length, FILM_COUNT_PER_STEP));

    if (this._films.length > FILM_COUNT_PER_STEP) {
      this._renderShowMoreButton();
    }
  }

  _renderFilmList() {
    if (this._films.length === 0) {
      this._renderNoFilms();
      return;
    }

    this._renderSort();
    this._renderFilmItems();
  }
}
