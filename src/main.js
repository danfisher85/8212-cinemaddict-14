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
import NoFilmView from './view/no-film.js';
import ShowMoreView from './view/show-more.js';
import PopupView from './view/popup.js';
import FooterStatsView from './view/footer-stats.js';
import {render, RenderPosition, sortFilmsByRating, sortFilmsByComments} from './utils.js';

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
render(siteHeaderElement, new HeaderProfileView(generateUserRating()).getElement(), RenderPosition.BEFOREEND);

const siteMainElement = document.querySelector('.main');
render(siteMainElement, new MainNavView().getElement(), RenderPosition.BEFOREEND);

const siteMainNavElement = document.querySelector('.main-navigation');
render(siteMainNavElement, new FilterView(filters).getElement(), RenderPosition.BEFOREEND);
render(siteMainNavElement, new NavStatsView().getElement(), RenderPosition.BEFOREEND);

render(siteMainElement, new FilmsContainerView().getElement(), RenderPosition.BEFOREEND);

// Film
const renderFilm = (filmListElement, film) => {
  const filmCard = new FilmView(film);

  const filmPopupHandler = (element) => {
    document.body.classList.remove('hide-overflow');
    document.body.removeChild(element.getElement());
  };

  const onFilmCardItemsClick = () => {
    document.body.classList.add('hide-overflow');

    const filmPopup = new PopupView(film, comments);
    const filmPopupClose = filmPopup.getElement().querySelector('.film-details__close-btn');

    filmPopupClose.addEventListener('click', () => {
      filmPopupHandler(filmPopup);
    });

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        filmPopupHandler(filmPopup);
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };
    document.addEventListener('keydown', onEscKeyDown);

    document.body.appendChild(filmPopup.getElement());
  };

  filmCard.getElement().querySelector('.film-card__poster').addEventListener('click', onFilmCardItemsClick);
  filmCard.getElement().querySelector('.film-card__title').addEventListener('click', onFilmCardItemsClick);
  filmCard.getElement().querySelector('.film-card__comments').addEventListener('click', onFilmCardItemsClick);

  render(filmListElement, filmCard.getElement(), RenderPosition.BEFOREEND);
};

// Films List
if (films.length === 0) {
  render(siteMainElement, new NoFilmView().getElement(), RenderPosition.BEFOREEND);
} else {
  render(siteMainElement, new SortingView().getElement(), RenderPosition.BEFOREEND);
  const filmsElement = siteMainElement.querySelector('.films');
  render(filmsElement, new FilmsListView().getElement(), RenderPosition.BEFOREEND);
  const filmsListAllElement = filmsElement.querySelector('.films-list--all');
  const filmsListContainerElement = filmsListAllElement.querySelector('.films-list__container');

  for (let i = 0; i < Math.min(films.length, FILM_COUNT_PER_STEP); i++) {
    renderFilm(filmsListContainerElement, films[i]);
  }

  if (films.length > FILM_COUNT_PER_STEP) {
    let renderedFilmsCount = FILM_COUNT_PER_STEP;

    render(filmsListAllElement, new ShowMoreView().getElement(), RenderPosition.BEFOREEND);

    const showMoreButton = filmsElement.querySelector('.films-list__show-more');

    showMoreButton.addEventListener('click', (evt) => {
      evt.preventDefault();
      films
        .slice(renderedFilmsCount, renderedFilmsCount + FILM_COUNT_PER_STEP)
        .forEach((film) => renderFilm(filmsListContainerElement, film));

      renderedFilmsCount += FILM_COUNT_PER_STEP;

      if (renderedFilmsCount >= films.length) {
        showMoreButton.remove();
      }
    });
  }

  // Films Top Rated
  const filmsTopRated = sortFilmsByRating(films);
  render(filmsElement, new FilmsListTopView().getElement(), RenderPosition.BEFOREEND);
  const filmsListTopContainerElement = filmsElement.querySelector('.films-list--top .films-list__container');

  for (let i = 0; i < TOP_RATED_COUNT; i++) {
    renderFilm(filmsListTopContainerElement, filmsTopRated[i]);
  }

  // Films Most Commented
  const filmsTopCommented = sortFilmsByComments(films);
  render(filmsElement, new FilmsListCommentedView().getElement(), RenderPosition.BEFOREEND);
  const filmsListCommentedContainerElement = filmsElement.querySelector('.films-list--commented .films-list__container');

  for (let i = 0; i < COMMENTED_COUNT; i++) {
    renderFilm(filmsListCommentedContainerElement, filmsTopCommented[i]);
  }
}

// Footer Stats
const siteFooterElement = document.querySelector('.footer');
render(siteFooterElement, new FooterStatsView(footerStats).getElement(), RenderPosition.BEFOREEND);
