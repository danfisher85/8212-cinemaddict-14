import HeaderProfileView from './view/profile.js';
import MainNavView from './view/main-nav.js';
import FilterView from './view/main-nav-filter.js';
import NavStatsView from './view/main-nav-stats.js';
import FooterStatsView from './view/footer-stats.js';
import {render, RenderPosition} from './utils/render.js';

import FilmListPresenter from './presenter/film-list.js';

// Models
import FilmsModel from './model/films.js';
import FilterModel from './model/filter.js';

// Mocks
import {generateUserRating} from './mock/user-rating.js';
import {generateFilms} from './mock/film.js';
import {generateFooterStats} from './mock/footer-stats.js';

const FILM_COUNT = 20;

const films = generateFilms(FILM_COUNT);

const filters = [
  {
    type: 'all',
    name: 'ALL',
    count: 0,
  },
];

const footerStats = generateFooterStats(films);

const filmsModel = new FilmsModel();
filmsModel.setFilms(films);

const filterModel = new FilterModel();

const siteHeaderElement = document.querySelector('.header');
render(siteHeaderElement, new HeaderProfileView(generateUserRating()), RenderPosition.BEFOREEND);

const siteMainElement = document.querySelector('.main');
render(siteMainElement, new MainNavView(), RenderPosition.AFTERBEGIN);

const siteMainNavElement = document.querySelector('.main-navigation');
render(siteMainNavElement, new FilterView(filters, 'all'), RenderPosition.BEFOREEND);
render(siteMainNavElement, new NavStatsView(), RenderPosition.BEFOREEND);

const filmListPresenter = new FilmListPresenter(siteMainElement, filmsModel);
filmListPresenter.init();

// Footer Stats
const siteFooterElement = document.querySelector('.footer');
render(siteFooterElement, new FooterStatsView(footerStats), RenderPosition.BEFOREEND);
