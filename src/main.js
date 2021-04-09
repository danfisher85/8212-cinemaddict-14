import {createProfileTemplate} from './view/profile.js';
import MainNavView from './view/main-nav.js';
import {createFilterTemplate} from './view/main-nav-filter.js';
import NavStatsView from './view/main-nav-stats.js';
import SortingView from './view/sorting.js';
import FilmsContainerView from './view/films.js';
import FilmsListView from './view/films-list.js';
import FilmsListTopView from './view/films-list-top.js';
import FilmsListCommentedView from './view/films-list-commented.js';
import {createFilmCardTemplate} from './view/film-card.js';
import ShowMoreView from './view/show-more.js';
import {createPopupTemplate} from './view/popup.js';
import {createFooterStatsTemplate} from './view/footer-stats.js';
import {renderTemplate, renderElement, RenderPosition} from './utils.js';

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

const siteHeaderElement = document.querySelector('.header');
renderTemplate(siteHeaderElement, createProfileTemplate(generateUserRating()), 'beforeend');

const siteMainElement = document.querySelector('.main');
renderElement(siteMainElement, new MainNavView().getElement(), RenderPosition.BEFOREEND);
renderElement(siteMainElement, new SortingView().getElement(), RenderPosition.BEFOREEND);
const siteMainNavElement = document.querySelector('.main-navigation');
renderTemplate(siteMainNavElement, createFilterTemplate(filters), 'beforeend');
renderElement(siteMainNavElement, new NavStatsView().getElement(), RenderPosition.BEFOREEND);

renderElement(siteMainElement, new FilmsContainerView().getElement(), RenderPosition.BEFOREEND);



// Films
const filmsElement = siteMainElement.querySelector('.films');

// Films List
renderElement(filmsElement, new FilmsListView().getElement(), RenderPosition.BEFOREEND);
const filmsListAllElement = filmsElement.querySelector('.films-list--all');
const filmsListContainerElement = filmsListAllElement.querySelector('.films-list__container');

for (let i = 0; i < Math.min(films.length, FILM_COUNT_PER_STEP); i++) {
  renderTemplate(filmsListContainerElement, createFilmCardTemplate(films[i]), 'beforeend');
}

if (films.length > FILM_COUNT_PER_STEP) {
  let renderedFilmsCount = FILM_COUNT_PER_STEP;

  renderElement(filmsListAllElement, new ShowMoreView().getElement(), RenderPosition.BEFOREEND);

  const showMoreButton = filmsElement.querySelector('.films-list__show-more');

  showMoreButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    films
      .slice(renderedFilmsCount, renderedFilmsCount + FILM_COUNT_PER_STEP)
      .forEach((film) => renderTemplate(filmsListContainerElement, createFilmCardTemplate(film), 'beforeend'));

    renderedFilmsCount += FILM_COUNT_PER_STEP;

    if (renderedFilmsCount >= films.length) {
      showMoreButton.remove();
    }
  });
}

// Films Top Rated
renderElement(filmsElement, new FilmsListTopView().getElement(), RenderPosition.BEFOREEND);
const filmsListTopContainerElement = filmsElement.querySelector('.films-list--top .films-list__container');

for (let i = 0; i < TOP_RATED_COUNT; i++) {
  renderTemplate(filmsListTopContainerElement, createFilmCardTemplate(filmsTopRated[i]), 'beforeend');
}

// Films Most Commented
renderElement(filmsElement, new FilmsListCommentedView().getElement(), RenderPosition.BEFOREEND);
const filmsListCommentedContainerElement = filmsElement.querySelector('.films-list--commented .films-list__container');

for (let i = 0; i < COMMENTED_COUNT; i++) {
  renderTemplate(filmsListCommentedContainerElement, createFilmCardTemplate(filmsTopCommented[i]), 'beforeend');
}

// Footer Stats
const siteFooterElement = document.querySelector('.footer');
renderTemplate(siteFooterElement, createFooterStatsTemplate(footerStats), 'beforeend');

// Popup
// renderTemplate(siteFooterElement, createPopupTemplate(films[0]), 'afterend');
