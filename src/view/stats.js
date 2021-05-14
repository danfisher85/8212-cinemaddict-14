import dayjs from 'dayjs';
import Smart from './smart.js';
import {getWatchedFilmsCount, getUserRankName, getPluralized} from '../utils/film.js';

const createFilterItemTemplate = (filterItem, currentFilterType) => {
  const {type, name} = filterItem;
  return `<input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-${type}" value="${type}" ${type === currentFilterType ? `checked` : ''}>
    <label for="statistic-${type}" class="statistic__filters-label">${name}</label>`;
};

const createFilterTemplate = (filterItems, currentFilterType) => {
  const filterItemsTemplate = filterItems.map((filter) => createFilterItemTemplate(filter, currentFilterType)).join('');

  return `<form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
    <p class="statistic__filters-description">Show stats:</p>
    ${filterItemsTemplate}
  </form>`;
};

const createUserRankTemplate = (filmCount) => {
  const userRankName = getUserRankName(filmCount);

  return `<p class="statistic__rank">
    Your rank
    <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    <span class="statistic__rank-label">${userRankName}</span>
  </p>`;
};

const createStatsTemplate = (films, filteredFilms, filters, currentFilterType) => {

  return `<section class="statistic">

    ${createUserRankTemplate(getWatchedFilmsCount(films))}

    ${createFilterTemplate(filters, currentFilterType)}

    <ul class="statistic__text-list">
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">You watched</h4>
        <p class="statistic__item-text">${getWatchedFilmsCount(filteredFilms)} <span class="statistic__item-description">${getPluralized(getWatchedFilmsCount(filteredFilms), 'movie')}</span></p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Total duration</h4>
        <p class="statistic__item-text">130 <span class="statistic__item-description">h</span> 22 <span class="statistic__item-description">m</span></p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Top genre</h4>
        <p class="statistic__item-text">Sci-Fi</p>
      </li>
    </ul>

    <div class="statistic__chart-wrap">
      <canvas class="statistic__chart" width="1000"></canvas>
    </div>

  </section>`;
};

export default class Stats extends Smart {
  constructor(films, filteredFilms, filterItems, currentFilterType) {
    super();

    this._films = films;
    this._filteredFilms = filteredFilms;
    this._filterItems = filterItems;
    this._currentFilterType = currentFilterType;

    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createStatsTemplate(this._films, this._filteredFilms, this._filterItems, this._currentFilterType);
  }

  _filterTypeChangeHandler(evt) {
    if (evt.target.tagName !== 'INPUT') {
      return;
    }
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.value);
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement().querySelector('.statistic__filters').addEventListener('change', this._filterTypeChangeHandler);
  }
}
