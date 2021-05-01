import SortingView from '../view/sorting.js';
import NoFilmView from '../view/no-film.js';
import FilmHolderView from '../view/films.js';
import FilmsListView from '../view/films-list.js';
import FilmsListInnerView from '../view/films-list-inner.js';
import ShowMoreView from '../view/show-more.js';
import {sortFilmDate, sortFilmRating} from '../utils/film.js';
import FilmPresenter from './film.js';
import {updateItem} from '../utils/common.js';
import {SortType} from '../const.js';

import {render, RenderPosition, remove} from '../utils/render.js';

const FILM_COUNT_PER_STEP = 5;

export default class FilmList {
  constructor(filmListContainer, filmsModel) {
    this._filmsModel = filmsModel;
    this._filmListContainer = filmListContainer;
    this._renderedFilmCount = FILM_COUNT_PER_STEP;

    // List
    this._filmHolder = new FilmHolderView();
    this._filmListComponent = new FilmsListView();
    this._filmListInnerComponent = new FilmsListInnerView();
    this._sortComponent = new SortingView();
    this._noFilmComponent = new NoFilmView();
    this._showMoreButtonComponent = new ShowMoreView();

    this._handleFilmChange = this._handleFilmChange.bind(this);
    this._handlePopupMode = this._handlePopupMode.bind(this);
    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(films) {
    this._films = films.slice();
    this._sourcedFilms = films.slice();

    this._filmPresenter = {};
    this._currentSortType = SortType.DEFAULT;

    // Regular
    render(this._filmListContainer, this._filmHolder, RenderPosition.BEFOREEND); // .films
    render(this._filmHolder, this._filmListComponent, RenderPosition.BEFOREEND); // .films-list
    render(this._filmListComponent, this._filmListInnerComponent, RenderPosition.BEFOREEND); // .films-list__container

    this._renderFilmList();
  }

  _getFilms() {
    return this._filmsModel.getFilms();
  }

  _sortFilms(sortType) {
    switch (sortType) {
      case SortType.DATE:
        this._films.sort(sortFilmDate);
        break;
      case SortType.RATING:
        this._films.sort(sortFilmRating);
        break;
      default:
        this._films = this._sourcedFilms.slice();
    }

    this._currentSortType = sortType;
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._sortFilms(sortType);
    this._clearFilmList();
    this._renderFilmItems();
  }

  _renderSort() {
    render(this._filmHolder, this._sortComponent, RenderPosition.BEFOREBEGIN);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _handleFilmChange(updatedFilm) {
    this._films = updateItem(this._films, updatedFilm);
    this._sourcedFilms = updateItem(this._sourcedFilms, updatedFilm);
    this._filmPresenter[updatedFilm.id].init(updatedFilm);
  }

  _handlePopupMode() {
    Object
      .values(this._filmPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _renderFilm(film, filmContainer) {
    const filmPresenter = new FilmPresenter(filmContainer, this._handleFilmChange, this._handlePopupMode);
    filmPresenter.init(film);
    this._filmPresenter[film.id] = filmPresenter;
  }

  _renderFilms(from, to) {
    this._films
      .slice(from, to)
      .forEach((film) => this._renderFilm(film, this._filmListInnerComponent));
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

  _clearFilmList() {
    Object
      .values(this._filmPresenter)
      .forEach((presenter) => presenter.destroy());

    this._filmPresenter = {};
    this._renderedFilmCount = FILM_COUNT_PER_STEP;
    remove(this._showMoreButtonComponent);
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
