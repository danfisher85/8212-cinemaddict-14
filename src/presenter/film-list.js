import UserRankView from '../view/user-rank.js';
import FooterStatsView from '../view/footer-stats.js';
import SortingView from '../view/sorting.js';
import NoFilmView from '../view/no-film.js';
import FilmsHolderView from '../view/films-holder.js';
import FilmsListView from '../view/films-list.js';
import FilmsListInnerView from '../view/films-list-inner.js';
import LoadingView from '../view/loading.js';
import ShowMoreView from '../view/show-more.js';
import {sortFilmDate, sortFilmRating, getWatchedFilmsCount} from '../utils/film.js';
import {filter} from '../utils/filter.js';
import FilmPresenter from './film.js';
import {SortType, UpdateType, UserAction, State} from '../const.js';

import {render, RenderPosition, remove} from '../utils/render.js';

const FILM_COUNT_PER_STEP = 5;

export default class FilmList {
  constructor(filmListContainer, filmsModel, filterModel, commentsModel, api) {
    this._filmsModel = filmsModel;
    this._filterModel = filterModel;
    this._commentsModel = commentsModel;
    this._filmListContainer = filmListContainer;
    this._renderedFilmCount = FILM_COUNT_PER_STEP;
    this._filmPresenter = {};
    this._currentSortType = SortType.DEFAULT;
    this._isLoading = true;
    this._api = api;

    this._sortComponent = null;
    this._showMoreButtonComponent = null;
    this._userRankComponent = null;
    this._footerStatsComponent = null;

    this._siteHeaderElement = document.querySelector('.header');
    this._siteFooterElement = document.querySelector('.footer');

    // List
    this._filmHolder = new FilmsHolderView();
    this._filmListComponent = new FilmsListView();
    this._filmListInnerComponent = new FilmsListInnerView();
    this._noFilmComponent = new NoFilmView();
    this._loadingComponent = new LoadingView();

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handlePopupMode = this._handlePopupMode.bind(this);
    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    this._filmsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  init() {
    render(this._filmListContainer, this._filmHolder, RenderPosition.BEFOREEND); // .films
    render(this._filmHolder, this._filmListComponent, RenderPosition.BEFOREEND); // .films-list
    render(this._filmListComponent, this._filmListInnerComponent, RenderPosition.BEFOREEND); // .films-list__container

    this._renderFilmList();
  }

  show() {
    this._filmHolder.show();
    this._sortComponent.show();
    this._handleSortTypeChange(SortType.DEFAULT);
  }

  hide() {
    this._filmHolder.hide();
    this._sortComponent.hide();
    this._handleSortTypeChange(SortType.DEFAULT);
  }

  _getFilms() {
    const filterType = this._filterModel.get();
    const films = this._filmsModel.get().slice();
    const filteredFilms = filter[filterType](films);

    switch (this._currentSortType) {
      case SortType.DATE:
        return filteredFilms.sort(sortFilmDate);
      case SortType.RATING:
        return filteredFilms.sort(sortFilmRating);
    }

    return filteredFilms;
  }

  _renderUserRank() {
    if (this._userRankComponent !== null) {
      this._userRankComponent = null;
    }

    const watchedFilmsCount = getWatchedFilmsCount(this._filmsModel.get());
    this._userRankComponent = new UserRankView(watchedFilmsCount);

    render(this._siteHeaderElement, this._userRankComponent, RenderPosition.BEFOREEND);
  }

  _renderFooterStats() {
    if (this._footerStatsComponent !== null) {
      this._footerStatsComponent = null;
    }

    this._footerStatsComponent = new FooterStatsView(this._filmsModel.get().length);
    render(this._siteFooterElement, this._footerStatsComponent, RenderPosition.BEFOREEND);
  }

  _renderSort() {
    if (this._sortComponent !== null) {
      this._sortComponent = null;
    }

    this._sortComponent = new SortingView(this._currentSortType);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);

    render(this._filmHolder, this._sortComponent, RenderPosition.BEFOREBEGIN);
  }

  _renderFilm(film, filmContainer) {
    const filmPresenter = new FilmPresenter(filmContainer, this._handleViewAction, this._handlePopupMode, this._commentsModel, this._api);
    filmPresenter.init(film);
    this._filmPresenter[film.id] = filmPresenter;
  }

  _renderFilms(films) {
    films.forEach((film) => this._renderFilm(film, this._filmListInnerComponent));
  }

  _renderLoading() {
    render(this._filmListContainer, this._loadingComponent, RenderPosition.BEFOREEND);
  }

  _renderNoFilms() {
    render(this._filmListContainer, this._noFilmComponent, RenderPosition.BEFOREEND);
  }

  _renderShowMoreButton() {
    if (this._showMoreButtonComponent !== null) {
      this._showMoreButtonComponent = null;
    }

    this._showMoreButtonComponent = new ShowMoreView();
    this._showMoreButtonComponent.setClickHandler(this._handleShowMoreButtonClick);

    render(this._filmListComponent, this._showMoreButtonComponent, RenderPosition.BEFOREEND);
  }

  _clearFilmList({resetRenderedFilmCount = false, resetSortType = false} = {}) {
    const filmCount = this._getFilms().length;

    Object
      .values(this._filmPresenter)
      .forEach((presenter) => presenter.destroy());
    this._filmPresenter = {};

    remove(this._userRankComponent);
    remove(this._footerStatsComponent);
    remove(this._sortComponent);
    remove(this._noFilmComponent);
    remove(this._loadingComponent);
    remove(this._showMoreButtonComponent);

    this._renderedFilmCount = resetRenderedFilmCount ? FILM_COUNT_PER_STEP : Math.min(filmCount, this._renderedFilmCount);

    if (resetSortType) {
      this._currentSortType = SortType.DEFAULT;
    }
  }

  _renderFilmList() {
    if (this._isLoading) {
      this._renderLoading();
      return;
    }

    const films = this._getFilms();
    const filmCount = films.length;

    if (filmCount === 0) {
      this._renderNoFilms();
      return;
    }

    this._renderUserRank();
    this._renderFooterStats();
    this._renderSort();
    this._renderFilms(films.slice(0, Math.min(filmCount, this._renderedFilmCount)));

    if (filmCount > this._renderedFilmCount) {
      this._renderShowMoreButton();
    }
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._filmPresenter[data.id].init(data);
        break;
      case UpdateType.MINOR:
        this._clearFilmList();
        this._renderFilmList();
        break;
      case UpdateType.MAJOR:
        this._clearFilmList({resetRenderedFilmCount: true, resetSortType: true});
        this._renderFilmList();
        break;
      case UpdateType.INIT:
        this._isLoading = false;
        remove(this._loadingComponent);
        this._renderFilmList();
        break;
    }
  }

  _handleViewAction(actionType, updateType, update, comment) {
    switch (actionType) {
      case UserAction.UPDATE_FILM:
        this._api.updateFilm(update).then((response) => {
          this._filmsModel.update(updateType, response);
        });
        break;
      case UserAction.ADD_COMMENT:
        this._filmPresenter[update.id].setViewState(State.SAVING, comment);
        this._api.addComment(update, comment)
          .then((response) => {
            this._commentsModel.add(updateType, response.film, response.comments);
            this._filmsModel.update(updateType, response.film);
          })
          .catch(() => {
            this._filmPresenter[update.id].setViewState(State.ABORTING_SAVING, comment);
          });
        break;
      case UserAction.DELETE_COMMENT:
        this._filmPresenter[update.id].setViewState(State.DELETING, comment);
        this._api.deleteComment(comment)
          .then(() => {
            this._commentsModel.delete(updateType, comment);
            this._filmsModel.update(updateType, update);
          })
          .catch(() => {
            this._filmPresenter[update.id].setViewState(State.ABORTING_DELETING, comment);
          });
        break;
    }
  }

  _handlePopupMode() {
    Object
      .values(this._filmPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _handleShowMoreButtonClick() {
    const filmCount = this._getFilms().length;
    const newRenderedFilmCount = Math.min(filmCount, this._renderedFilmCount + FILM_COUNT_PER_STEP);
    const films = this._getFilms().slice(this._renderedFilmCount, newRenderedFilmCount);

    this._renderFilms(films);
    this._renderedFilmCount = newRenderedFilmCount;

    if (this._renderedFilmCount >= filmCount) {
      remove(this._showMoreButtonComponent);
    }
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    this._clearFilmList({resetRenderedFilmCount: true});
    this._renderFilmList();
  }
}
