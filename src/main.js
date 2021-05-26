import MainNavView from './view/main-nav.js';
import StatsView from './view/stats.js';
import {render, remove, RenderPosition} from './utils/render.js';
import {NavItem, UpdateType} from './const.js';

import FilmListPresenter from './presenter/film-list.js';
import FilterPresenter from './presenter/filter.js';

// Models
import FilmsModel from './model/films.js';
import CommentsModel from './model/comments.js';
import FilterModel from './model/filter.js';

import Api from './api.js';

const AUTHORIZATION = 'Basic fRxjCTzZVTjPgAAeA';
const END_POINT = 'https://14.ecmascript.pages.academy/cinemaddict';

const siteMainElement = document.querySelector('.main');

const api = new Api(END_POINT, AUTHORIZATION);

const commentsModel = new CommentsModel();
const filmsModel = new FilmsModel();
const filterModel = new FilterModel();

const mainNavElement = new MainNavView();

const filmListPresenter = new FilmListPresenter(siteMainElement, filmsModel, filterModel, commentsModel, api);
const filterPresenter = new FilterPresenter(mainNavElement, filterModel, filmsModel);

let statsComponent = null;

const handleNavClick = (navItem) => {
  switch (navItem) {
    case NavItem.FILMS:
      filmListPresenter.show();
      remove(statsComponent);
      break;
    case NavItem.STATS:
      filmListPresenter.hide();
      statsComponent = new StatsView(filmsModel.get());
      render(siteMainElement, statsComponent, RenderPosition.BEFOREEND);
      break;
  }
};

filmListPresenter.init();
filterPresenter.init();

api.getFilms()
  .then((films) => {
    filmsModel.set(UpdateType.INIT, films);
    render(siteMainElement, mainNavElement, RenderPosition.AFTERBEGIN);
    mainNavElement.setNavClickHandler(handleNavClick);
  })
  .catch(() => {
    filmsModel.set(UpdateType.INIT, []);
    render(siteMainElement, mainNavElement, RenderPosition.AFTERBEGIN);
    mainNavElement.setNavClickHandler(handleNavClick);
  });
