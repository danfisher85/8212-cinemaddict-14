import HeaderProfileView from './view/profile.js';
import MainNavView from './view/main-nav.js';
import FilterView from './view/main-nav-filter.js';
import NavStatsView from './view/main-nav-stats.js';
import SortingView from './view/sorting.js';
import FilmsContainerView from './view/films.js';
import FilmsListView from './view/films-list.js';
import FilmsListTopView from './view/films-list-top.js';
import FilmsListCommentedView from './view/films-list-commented.js';
import FilmView from './view/film-card.js';
import ShowMoreView from './view/show-more.js';
import PopupView from './view/popup.js';
import FooterStatsView from './view/footer-stats.js';
import {renderTemplate, renderElement, RenderPosition} from './utils.js';

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

const filmsTopRated = films.slice().sort((a, b) => a.rating > b.rating ? -1 : 1);
const filmsTopCommented = films.slice().sort((a, b) => a.comments.length > b.comments.length ? -1 : 1);

const siteHeaderElement = document.querySelector('.header');
renderElement(siteHeaderElement, new HeaderProfileView(generateUserRating()).getElement(), RenderPosition.BEFOREEND);

const siteMainElement = document.querySelector('.main');
renderElement(siteMainElement, new MainNavView().getElement(), RenderPosition.BEFOREEND);
renderElement(siteMainElement, new SortingView().getElement(), RenderPosition.BEFOREEND);
const siteMainNavElement = document.querySelector('.main-navigation');
renderElement(siteMainNavElement, new FilterView(filters).getElement(), RenderPosition.BEFOREEND);
renderElement(siteMainNavElement, new NavStatsView().getElement(), RenderPosition.BEFOREEND);

renderElement(siteMainElement, new FilmsContainerView().getElement(), RenderPosition.BEFOREEND);



// Films
const filmsElement = siteMainElement.querySelector('.films');

// Films List
renderElement(filmsElement, new FilmsListView().getElement(), RenderPosition.BEFOREEND);
const filmsListAllElement = filmsElement.querySelector('.films-list--all');
const filmsListContainerElement = filmsListAllElement.querySelector('.films-list__container');

for (let i = 0; i < Math.min(films.length, FILM_COUNT_PER_STEP); i++) {
  renderElement(filmsListContainerElement, new FilmView(films[i]).getElement(), RenderPosition.BEFOREEND);
}

if (films.length > FILM_COUNT_PER_STEP) {
  let renderedFilmsCount = FILM_COUNT_PER_STEP;

  renderElement(filmsListAllElement, new ShowMoreView().getElement(), RenderPosition.BEFOREEND);

  const showMoreButton = filmsElement.querySelector('.films-list__show-more');

  showMoreButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    films
      .slice(renderedFilmsCount, renderedFilmsCount + FILM_COUNT_PER_STEP)
      .forEach((film) => renderElement(filmsListContainerElement, new FilmView(film).getElement(), RenderPosition.BEFOREEND));

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
  renderElement(filmsListTopContainerElement, new FilmView(filmsTopRated[i]).getElement(), RenderPosition.BEFOREEND);
}

// Films Most Commented
renderElement(filmsElement, new FilmsListCommentedView().getElement(), RenderPosition.BEFOREEND);
const filmsListCommentedContainerElement = filmsElement.querySelector('.films-list--commented .films-list__container');

for (let i = 0; i < COMMENTED_COUNT; i++) {
  renderElement(filmsListCommentedContainerElement, new FilmView(filmsTopCommented[i]).getElement(), RenderPosition.BEFOREEND);
}

// Footer Stats
const siteFooterElement = document.querySelector('.footer');
renderElement(siteFooterElement, new FooterStatsView(footerStats).getElement(), RenderPosition.BEFOREEND);

// Popup
renderElement(siteFooterElement, new PopupView(films[0], comments).getElement(), RenderPosition.BEFOREEND);
