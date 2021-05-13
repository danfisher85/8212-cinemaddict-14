import MainNavView from './view/main-nav.js';
import StatsView from './view/statistics.js';
import {render, RenderPosition} from './utils/render.js';
import {NavItem} from './const.js';

import FilmListPresenter from './presenter/film-list.js';
import FilterPresenter from './presenter/filter.js';

// Models
import FilmsModel from './model/films.js';
import CommentsModel from './model/comments.js';
import FilterModel from './model/filter.js';

// Mocks
import {generateComments} from './mock/comment.js';
import {generateFilms} from './mock/film.js';

const FILM_COUNT = 20;

const comments = generateComments();
const films = generateFilms(FILM_COUNT, comments);

const commentsModel = new CommentsModel();
commentsModel.setComments(comments);

const filmsModel = new FilmsModel();
filmsModel.setFilms(films);

const filterModel = new FilterModel();

const siteMainElement = document.querySelector('.main');

const mainNavElement = new MainNavView();
render(siteMainElement, mainNavElement, RenderPosition.AFTERBEGIN);

const filmListPresenter = new FilmListPresenter(siteMainElement, filmsModel, filterModel, commentsModel);
const filterPresenter = new FilterPresenter(mainNavElement, filterModel, filmsModel);

filmListPresenter.init();
filterPresenter.init();

// Stats
const statsElement = new StatsView();
render(siteMainElement, statsElement, RenderPosition.BEFOREEND);

const handleNavClick = (navItem) => {
  switch (navItem) {
    case NavItem.FILMS:
      filmListPresenter.show();
      statsElement.hide();
      break;
    case NavItem.STATS:
      filmListPresenter.hide();
      statsElement.show();
      break;
  }
};
mainNavElement.setNavClickHandler(handleNavClick);
