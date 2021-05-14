import dayjs from 'dayjs';
import Smart from './smart.js';
import {getWatchedFilmsCount, getUserRankName, getPluralized} from '../utils/film.js';
import {countWatchedFilmInDateRange} from '../utils/stats.js';
import {StatsFilterType} from '../const.js';

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

const createStatsTemplate = (state, currentFilterType) => {
  const {films, dateFrom} = state;
  const filteredFilms = countWatchedFilmInDateRange(films, currentFilterType);

  const filters = [
    {
      type: StatsFilterType.ALL,
      name: 'All time',
    },
    {
      type: StatsFilterType.TODAY,
      name: 'Today',
    },
    {
      type: StatsFilterType.WEEK,
      name: 'Week',
    },
    {
      type: StatsFilterType.MONTH,
      name: 'Month',
    },
    {
      type: StatsFilterType.YEAR,
      name: 'Year',
    },
  ];

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
  constructor(films) {
    super();

    this._state = {
      films,
      dateFrom: (() => {
        return dayjs(0).toDate();
      })(),
    };

    this._currentFilterType = StatsFilterType.ALL;
    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);

    this._setInnerHandlers();
  }

  removeElement() {
    super.removeElement();
  }

  getTemplate() {
    return createStatsTemplate(this._state, this._currentFilterType);
  }

  restoreHandlers() {
    this._setInnerHandlers();
  }

  _setInnerHandlers() {
    this.getElement().querySelector('.statistic__filters').addEventListener('change', this._filterTypeChangeHandler);
  }

  _filterTypeChangeHandler(evt) {
    if (evt.target.tagName !== 'INPUT') {
      return;
    }
    evt.preventDefault();

    this._currentFilterType = evt.target.value;

    this.updateState({
      dateFrom: (() => {
        return dayjs().subtract(1, 'year').toDate();
      })(),
    });
  }
}
