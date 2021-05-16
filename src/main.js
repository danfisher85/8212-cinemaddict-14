import MainNavView from './view/main-nav.js';
import StatsView from './view/stats.js';
import {render, remove, RenderPosition} from './utils/render.js';
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

let statsComponent = null;

const handleNavClick = (navItem) => {
  switch (navItem) {
    case NavItem.FILMS:
      filmListPresenter.show();
      remove(statsComponent);
      break;
    case NavItem.STATS:
      filmListPresenter.hide();
      statsComponent = new StatsView(filmsModel.getFilms());
      render(siteMainElement, statsComponent, RenderPosition.BEFOREEND);
      break;
  }
};
mainNavElement.setNavClickHandler(handleNavClick);

filmListPresenter.init();
filterPresenter.init();
