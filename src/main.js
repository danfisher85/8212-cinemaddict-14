import {createProfileTemplate} from './view/profile.js';
import {createMainNavTemplate} from './view/main-navigation.js';
import {createFilterTemplate} from './view/filter.js';
import {createFilmsTemplate} from './view/films.js';
import {createFilmsListTemplate} from './view/films-list.js';
import {createFilmsListTopTemplate} from './view/films-list-top.js';
import {createFilmsListCommentedTemplate} from './view/films-list-commented.js';
import {createFilmCardTemplate} from './view/film-card.js';
import {createShowMoreTemplate} from './view/show-more.js';
import {createPopupTemplate} from './view/popup.js';
import {createFooterStatsTemplate} from './view/footer-stats.js';

const FILM_COUNT = 5;
const TOP_RATED_COUNT = 2;
const COMMENTED_COUNT = 2;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');

render(siteHeaderElement, createProfileTemplate(), 'beforeend');
render(siteMainElement, createMainNavTemplate(), 'beforeend');
render(siteMainElement, createFilterTemplate(), 'beforeend');

// Films
render(siteMainElement, createFilmsTemplate(), 'beforeend');
const filmsElement = siteMainElement.querySelector('.films');

// Films List
render(filmsElement, createFilmsListTemplate(), 'beforeend');
const filmsListContainerElement = filmsElement.querySelector('.films-list__container');

for (let i = 0; i < FILM_COUNT; i++) {
  render(filmsListContainerElement, createFilmCardTemplate(), 'beforeend');
}

render(filmsListContainerElement, createShowMoreTemplate(), 'afterend');

// Films Top Rated
render(filmsElement, createFilmsListTopTemplate(), 'beforeend');
const filmsListTopContainerElement = filmsElement.querySelector('.films-list--extra .films-list__container');

for (let i = 0; i < TOP_RATED_COUNT; i++) {
  render(filmsListTopContainerElement, createFilmCardTemplate(), 'beforeend');
}

// Films Most Commented
render(filmsElement, createFilmsListCommentedTemplate(), 'beforeend');
const filmsListCommentedContainerElement = filmsElement.querySelector('.films-list--extra + .films-list--extra .films-list__container');

for (let i = 0; i < COMMENTED_COUNT; i++) {
  render(filmsListCommentedContainerElement, createFilmCardTemplate(), 'beforeend');
}

// Footer Stats
const siteFooterElement = document.querySelector('.footer');
render(siteFooterElement, createFooterStatsTemplate(), 'beforeend');

// Popup
render(siteFooterElement, createPopupTemplate(), 'afterend');
