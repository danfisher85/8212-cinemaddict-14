import {createProfileTemplate} from './view/profile.js';
import {createMainNavTemplate} from './view/main-nav.js';
import {createFilterTemplate} from './view/main-nav-filter.js';
import {createNavStatsTemplate} from './view/main-nav-stats.js';
import {createSortingTemplate} from './view/sorting.js';
import {createFilmsTemplate} from './view/films.js';
import {createFilmsListTemplate} from './view/films-list.js';
import {createFilmsListTopTemplate} from './view/films-list-top.js';
import {createFilmsListCommentedTemplate} from './view/films-list-commented.js';
import {createFilmCardTemplate} from './view/film-card.js';
import {createShowMoreTemplate} from './view/show-more.js';
import {createPopupTemplate} from './view/popup.js';
import {createFooterStatsTemplate} from './view/footer-stats.js';

// Mocks
import {generateUserRating} from './mock/user-rating.js';
import {generateFilmCard} from './mock/film.js';
import {generateFilter} from './mock/filter.js';
import {generateFooterStats} from './mock/footer-stats.js';

const FILM_COUNT = 20;
const FILM_COUNT_PER_STEP = 5;
const TOP_RATED_COUNT = 2;
const COMMENTED_COUNT = 2;

const films = new Array(FILM_COUNT).fill().map(generateFilmCard);
const filters = generateFilter(films);
const footerStats = generateFooterStats(films);

const filmsTopRated = films.slice().sort((a, b) => a.rating > b.rating ? -1 : 1);
const filmsTopCommented = films.slice().sort((a, b) => a.comments.length > b.comments.length ? -1 : 1);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeaderElement = document.querySelector('.header');
render(siteHeaderElement, createProfileTemplate(generateUserRating()), 'beforeend');

const siteMainElement = document.querySelector('.main');
render(siteMainElement, createMainNavTemplate(), 'beforeend');
render(siteMainElement, createSortingTemplate(), 'beforeend');
render(siteMainElement, createFilmsTemplate(), 'beforeend');

const siteMainNavElement = document.querySelector('.main-navigation');
render(siteMainNavElement, createFilterTemplate(filters), 'beforeend');
render(siteMainNavElement, createNavStatsTemplate(), 'beforeend');

// Films
const filmsElement = siteMainElement.querySelector('.films');

// Films List
render(filmsElement, createFilmsListTemplate(), 'beforeend');
const filmsListContainerElement = filmsElement.querySelector('.films-list__container');

for (let i = 0; i < Math.min(films.length, FILM_COUNT_PER_STEP); i++) {
  render(filmsListContainerElement, createFilmCardTemplate(films[i]), 'beforeend');
}

if (films.length > FILM_COUNT_PER_STEP) {
  let renderedFilmsCount = FILM_COUNT_PER_STEP;

  render(filmsListContainerElement, createShowMoreTemplate(), 'afterend');

  const showMoreButton = filmsElement.querySelector('.films-list__show-more');

  showMoreButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    films
      .slice(renderedFilmsCount, renderedFilmsCount + FILM_COUNT_PER_STEP)
      .forEach((film) => render(filmsListContainerElement, createFilmCardTemplate(film), 'beforeend'));

    renderedFilmsCount += FILM_COUNT_PER_STEP;

    if (renderedFilmsCount >= films.length) {
      showMoreButton.remove();
    }
  });
}

// Films Top Rated
render(filmsElement, createFilmsListTopTemplate(), 'beforeend');
const filmsListTopContainerElement = filmsElement.querySelector('.films-list--extra .films-list__container');

for (let i = 0; i < TOP_RATED_COUNT; i++) {
  render(filmsListTopContainerElement, createFilmCardTemplate(filmsTopRated[i]), 'beforeend');
}

// Films Most Commented
render(filmsElement, createFilmsListCommentedTemplate(), 'beforeend');
const filmsListCommentedContainerElement = filmsElement.querySelector('.films-list--extra + .films-list--extra .films-list__container');

for (let i = 0; i < COMMENTED_COUNT; i++) {
  render(filmsListCommentedContainerElement, createFilmCardTemplate(filmsTopCommented[i]), 'beforeend');
}

// Footer Stats
const siteFooterElement = document.querySelector('.footer');
render(siteFooterElement, createFooterStatsTemplate(footerStats), 'beforeend');

// Popup
render(siteFooterElement, createPopupTemplate(films[0]), 'afterend');
