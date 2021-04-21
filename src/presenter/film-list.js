import SortingView from '../view/sorting.js';
import FilmView from '../view/film-card.js';
import NoFilmView from '../view/no-film.js';
import FilmHolderView from '../view/films.js';
import FilmsListView from '../view/films-list.js';
import FilmsListInnerView from '../view/films-list-inner.js';
import ShowMoreView from '../view/show-more.js';
import FilmsListTopView from '../view/films-list-top.js';
import FilmsListCommentedView from '../view/films-list-commented.js';
import FilmPresenter from './film.js';

import {render, RenderPosition, remove} from '../utils/render.js';

const FILM_COUNT_PER_STEP = 5;

export default class FilmList {
  constructor(filmListContainer) {
    this._filmListContainer = filmListContainer;
    this._renderedFilmCount = FILM_COUNT_PER_STEP;

    this._filmHolder = new FilmHolderView();
    this._filmListComponent = new FilmsListView();
    this._filmListInnerComponent = new FilmsListInnerView();
    this._sortComponent = new SortingView();
    this._noFilmComponent = new NoFilmView();
    this._showMoreButtonComponent = new ShowMoreView();

    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
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

  _renderFilm(film) {
    const filmPresenter = new FilmPresenter(this._filmListInnerComponent);
    filmPresenter.init(film, this._comments);
  }

  _renderFilms(from, to) {
    this._films
      .slice(from, to)
      .forEach((film) => this._renderFilm(film));
  }

  _renderNoFilms() {
    render(this._filmListContainer, this._noFilmComponent, RenderPosition.BEFOREEND);
  }

  _handleShowMoreButtonClick() {
    this._renderFilms(this._renderedFilmCount, this._renderedFilmCount + FILM_COUNT_PER_STEP);
    this._renderedFilmCount += FILM_COUNT_PER_STEP;

    if (this._renderedFilmCount >= this._films.length) {
      remove(this._showMoreButtonComponent);
    }
  }

  _renderShowMoreButton() {
    render(this._filmListComponent, this._showMoreButtonComponent, RenderPosition.BEFOREEND);

    this._showMoreButtonComponent.setClickHandler(this._handleShowMoreButtonClick);
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
