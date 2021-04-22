import HeaderProfileView from './view/profile.js';
import MainNavView from './view/main-nav.js';
import FilterView from './view/main-nav-filter.js';
import NavStatsView from './view/main-nav-stats.js';
import FooterStatsView from './view/footer-stats.js';
import {render, RenderPosition} from './utils/render.js';

import FilmListPresenter from './presenter/film-list.js';

// Mocks
import {generateUserRating} from './mock/user-rating.js';
import {generateFilms} from './mock/film.js';
import {generateFilter} from './mock/filter.js';
import {generateFooterStats} from './mock/footer-stats.js';

const FILM_COUNT = 20;

const films = generateFilms(FILM_COUNT);

const filters = generateFilter(films);
const footerStats = generateFooterStats(films);

const siteHeaderElement = document.querySelector('.header');
render(siteHeaderElement, new HeaderProfileView(generateUserRating()), RenderPosition.BEFOREEND);

const siteMainElement = document.querySelector('.main');
render(siteMainElement, new MainNavView(), RenderPosition.AFTERBEGIN);

const siteMainNavElement = document.querySelector('.main-navigation');
render(siteMainNavElement, new FilterView(filters), RenderPosition.BEFOREEND);
render(siteMainNavElement, new NavStatsView(), RenderPosition.BEFOREEND);

const filmListPresenter = new FilmListPresenter(siteMainElement);
filmListPresenter.init(films);

// Footer Stats
const siteFooterElement = document.querySelector('.footer');
render(siteFooterElement, new FooterStatsView(footerStats), RenderPosition.BEFOREEND);
