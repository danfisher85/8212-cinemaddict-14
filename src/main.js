import HeaderProfileView from './view/profile.js';
import MainNavView from './view/main-nav.js';
import FilterView from './view/main-nav-filter.js';
import NavStatsView from './view/main-nav-stats.js';
import SortingView from './view/sorting.js';
import FilmHolderView from './view/films.js';
import FilmsListView from './view/films-list.js';
import FilmsListTopView from './view/films-list-top.js';
import FilmsListCommentedView from './view/films-list-commented.js';
import FilmView from './view/film-card.js';
import NoFilmView from './view/no-film.js';
import ShowMoreView from './view/show-more.js';
import PopupView from './view/popup.js';
import FooterStatsView from './view/footer-stats.js';
import {sortFilmsByRating, sortFilmsByComments} from './utils/film.js';
import {render, RenderPosition, remove} from './utils/render.js';

import FilmListPresenter from './presenter/film-list.js';

// Mocks
import {generateUserRating} from './mock/user-rating.js';
import {generateCommentsList} from './mock/comment.js';
import {generateFilms} from './mock/film.js';
import {generateFilter} from './mock/filter.js';
import {generateFooterStats} from './mock/footer-stats.js';

const FILM_COUNT = 20;
const FILM_COUNT_PER_STEP = 5;
const TOP_RATED_COUNT = 2;
const COMMENTED_COUNT = 2;

const comments = generateCommentsList();
const films = generateFilms(FILM_COUNT, comments);

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
filmListPresenter.init(films, comments);

// Footer Stats
const siteFooterElement = document.querySelector('.footer');
render(siteFooterElement, new FooterStatsView(footerStats), RenderPosition.BEFOREEND);
