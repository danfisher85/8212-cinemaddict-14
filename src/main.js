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
import {sortFilmsByRating, sortFilmsByComments} from './utils/film.js';
import {render, RenderPosition, remove} from './utils/render.js';

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
render(siteMainElement, new MainNavView(), RenderPosition.BEFOREEND);

const siteMainNavElement = document.querySelector('.main-navigation');
render(siteMainNavElement, new FilterView(filters), RenderPosition.BEFOREEND);
render(siteMainNavElement, new NavStatsView(), RenderPosition.BEFOREEND);

// Film
const renderFilm = (filmListElement, film) => {
  const filmCard = new FilmView(film);

  const closePopupHandler = (element) => {
    document.body.classList.remove('hide-overflow');
    document.body.removeChild(element.getElement());
  };

  filmCard.setItemsClickHandler(() => {
    document.body.classList.add('hide-overflow');
    const filmPopup = new PopupView(film, comments);

    filmPopup.setCloseClickHandler(() => {
      closePopupHandler(filmPopup);
    });

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        closePopupHandler(filmPopup);
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };
    document.addEventListener('keydown', onEscKeyDown);

    document.body.appendChild(filmPopup.getElement());
  });

  render(filmListElement, filmCard, RenderPosition.BEFOREEND);
};

// Films List
const renderFilms = (filmsElement, films) => {
  if (films.length === 0) {
    render(siteMainElement, new NoFilmView(), RenderPosition.BEFOREEND);
    return;
  }

  render(filmsElement, new SortingView(), RenderPosition.BEFOREEND);
  render(filmsElement, new FilmsListView(), RenderPosition.BEFOREEND);
  const filmsListAllElement = filmsElement.querySelector('.films-list--all');
  const filmsListContainerElement = filmsListAllElement.querySelector('.films-list__container');

  for (let i = 0; i < Math.min(films.length, FILM_COUNT_PER_STEP); i++) {
    renderFilm(filmsListContainerElement, films[i]);
  }

  if (films.length > FILM_COUNT_PER_STEP) {
    let renderedFilmsCount = FILM_COUNT_PER_STEP;

    const showMoreButton = new ShowMoreView();
    render(filmsListAllElement, showMoreButton, RenderPosition.BEFOREEND);

    showMoreButton.setClickHandler(() => {
      films
        .slice(renderedFilmsCount, renderedFilmsCount + FILM_COUNT_PER_STEP)
        .forEach((film) => renderFilm(filmsListContainerElement, film));

      renderedFilmsCount += FILM_COUNT_PER_STEP;

      if (renderedFilmsCount >= films.length) {
        remove(showMoreButton);
      }
    });
  }

  // Films Top Rated
  const filmsTopRated = sortFilmsByRating(films);
  render(filmsElement, new FilmsListTopView(), RenderPosition.BEFOREEND);
  const filmsListTopContainerElement = filmsElement.querySelector('.films-list--top .films-list__container');

  for (let i = 0; i < TOP_RATED_COUNT; i++) {
    renderFilm(filmsListTopContainerElement, filmsTopRated[i]);
  }

  // Films Most Commented
  const filmsTopCommented = sortFilmsByComments(films);
  render(filmsElement, new FilmsListCommentedView(), RenderPosition.BEFOREEND);
  const filmsListCommentedContainerElement = filmsElement.querySelector('.films-list--commented .films-list__container');

  for (let i = 0; i < COMMENTED_COUNT; i++) {
    renderFilm(filmsListCommentedContainerElement, filmsTopCommented[i]);
  }
};

const filmsContainer = new FilmsContainerView();
render(siteMainElement, filmsContainer, RenderPosition.BEFOREEND);
renderFilms(filmsContainer.getElement(), films);

// Footer Stats
const siteFooterElement = document.querySelector('.footer');
render(siteFooterElement, new FooterStatsView(footerStats), RenderPosition.BEFOREEND);
