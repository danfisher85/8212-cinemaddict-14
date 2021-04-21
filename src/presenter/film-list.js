import SortingView from '../view/sorting.js';
import NoFilmView from '../view/no-film.js';
import FilmHolderView from '../view/films.js';
import FilmsListView from '../view/films-list.js';
import FilmsListInnerView from '../view/films-list-inner.js';
import ShowMoreView from '../view/show-more.js';
import FilmsListTopView from '../view/films-list-top.js';
import FilmsListTopInnerView from '../view/films-list-top-inner.js';
import FilmsListCommentedView from '../view/films-list-commented.js';
import FilmsListCommentedInnerView from '../view/films-list-commented-inner.js';
import {sortFilmsByRating, sortFilmsByComments} from '../utils/film.js';
import FilmPresenter from './film.js';

import {render, RenderPosition, remove} from '../utils/render.js';

const FILM_COUNT_PER_STEP = 5;
const TOP_RATED_COUNT = 2;
const COMMENTED_COUNT = 2;

export default class FilmList {
  constructor(filmListContainer) {
    this._filmListContainer = filmListContainer;
    this._renderedFilmCount = FILM_COUNT_PER_STEP;
    this._renderedFilmTopCount = TOP_RATED_COUNT;
    this._renderedFilmCommentedCount = COMMENTED_COUNT;

    // List
    this._filmHolder = new FilmHolderView();
    this._filmListComponent = new FilmsListView();
    this._filmListInnerComponent = new FilmsListInnerView();
    this._sortComponent = new SortingView();
    this._noFilmComponent = new NoFilmView();
    this._showMoreButtonComponent = new ShowMoreView();

    // Top Rated
    this._filmListTopComponent = new FilmsListTopView();
    this._filmListTopInnerComponent = new FilmsListTopInnerView();

    // Most Commented
    this._filmListCommentedComponent = new FilmsListCommentedView();
    this._filmListCommentedInnerComponent = new FilmsListCommentedInnerView();

    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
  }

  init(films, comments) {
    this._films = films.slice();
    this._comments = comments.slice();

    this._filmsTop = sortFilmsByRating(films);
    this._filmsCommented = sortFilmsByComments(films);

    // Regular
    render(this._filmListContainer, this._filmHolder, RenderPosition.BEFOREEND); // .films
    render(this._filmHolder, this._filmListComponent, RenderPosition.BEFOREEND); // .films-list
    render(this._filmListComponent, this._filmListInnerComponent, RenderPosition.BEFOREEND); // .films-list__container

    // Top Rated
    render(this._filmHolder, this._filmListTopComponent, RenderPosition.BEFOREEND);
    render(this._filmListTopComponent, this._filmListTopInnerComponent, RenderPosition.BEFOREEND);

    // Most Commented
    render(this._filmHolder, this._filmListCommentedComponent, RenderPosition.BEFOREEND);
    render(this._filmListCommentedComponent, this._filmListCommentedInnerComponent, RenderPosition.BEFOREEND);

    this._renderFilmList();
    this._renderFilmTopList();
    this._renderFilmCommentedList();
  }

  _renderSort() {
    render(this._filmHolder, this._sortComponent, RenderPosition.BEFOREBEGIN);
  }

  _renderFilm(film, place) {
    const filmPresenter = new FilmPresenter(place);
    filmPresenter.init(film, this._comments);
  }

  _renderFilms(from, to) {
    this._films
      .slice(from, to)
      .forEach((film) => this._renderFilm(film, this._filmListInnerComponent));
  }

  _renderFilmsTop(from, to) {
    this._filmsTop
      .slice(from, to)
      .forEach((film) => this._renderFilm(film, this._filmListTopInnerComponent));
  }

  _renderFilmsCommented(from, to) {
    this._filmsCommented
      .slice(from, to)
      .forEach((film) => this._renderFilm(film, this._filmListCommentedInnerComponent));
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

  _renderFilmTopList() {
    this._renderFilmsTop(0, this._renderedFilmTopCount);
  }

  _renderFilmCommentedList() {
    this._renderFilmsCommented(0, this._renderedFilmCommentedCount);
  }
}
