import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import Smart from './smart.js';
import {getWatchedFilmsCount, getUserRankName, getPluralized} from '../utils/film.js';
import {countWatchedFilmInDateRange, countWatchedFilmDuration, getHumanizedDurationStats, getFilmGenreStats, getGenresLabels, getTopGenreLabels} from '../utils/stats.js';
import {StatsFilterType} from '../const.js';

const createFilterItemTemplate = (filterItem, currentFilterType) => {
  const {type, name} = filterItem;
  return `<input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-${type}" value="${type}" ${type === currentFilterType ? 'checked' : ''}>
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

const createGenresChart = (statisticCtx, films, currentChartFilter) => {
  const BAR_HEIGHT = 50;
  const filmGenreLabels = [];
  const filmGenreCounts = [];

  const filteredFilms = countWatchedFilmInDateRange(films, currentChartFilter);
  statisticCtx.height = BAR_HEIGHT * Object.entries(getFilmGenreStats(filteredFilms)).length;
  getGenresLabels(filmGenreLabels, filmGenreCounts, filteredFilms);

  return new Chart(statisticCtx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: filmGenreLabels,
      datasets: [{
        data: filmGenreCounts,
        backgroundColor: '#ffe800',
        hoverBackgroundColor: '#ffe800',
        anchor: 'start',
        barThickness: 24,
      }],
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 20,
          },
          color: '#ffffff',
          anchor: 'start',
          align: 'start',
          offset: 40,
        },
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: '#ffffff',
            padding: 100,
            fontSize: 20,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
};

const createStatsTemplate = (state, currentFilterType) => {
  const {films} = state;
  const filteredFilms = countWatchedFilmInDateRange(films, currentFilterType);
  const watchedFilmDurationMin = countWatchedFilmDuration(filteredFilms);
  const topGenres = getFilmGenreStats(filteredFilms);

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
        <p class="statistic__item-text">${getHumanizedDurationStats(watchedFilmDurationMin)}</p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Top ${getPluralized(topGenres, 'genre')}</h4>
        <p class="statistic__item-text">${getTopGenreLabels(topGenres)}</p>
      </li>
    </ul>

    <div class="statistic__chart-wrap">
      <canvas class="statistic__chart" width="1000" data-filter="${currentFilterType}"></canvas>
    </div>

  </section>`;
};

export default class Stats extends Smart {
  constructor(films) {
    super();

    this._state = {
      films,
    };

    this._currentFilterType = StatsFilterType.ALL;
    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);

    this._setGenresChart();
    this._setInnerHandlers();
  }

  getTemplate() {
    return createStatsTemplate(this._state, this._currentFilterType);
  }

  removeElement() {
    super.removeElement();
  }

  restoreHandlers() {
    this._setGenresChart();
    this._setInnerHandlers();
  }

  _setInnerHandlers() {
    this.getElement().querySelector('.statistic__filters').addEventListener('change', this._filterTypeChangeHandler);
  }

  _setGenresChart() {
    if (this._genresChart !== null) {
      this._genresChart = null;
    }

    const {films} = this._state;
    const statisticCtx = this.getElement().querySelector('.statistic__chart');
    const currentChartFilter = statisticCtx.dataset.filter;

    this._genresChart = createGenresChart(statisticCtx, films, currentChartFilter);
  }

  _filterTypeChangeHandler(evt) {
    if (evt.target.tagName !== 'INPUT') {
      return;
    }
    evt.preventDefault();

    this._currentFilterType = evt.target.value;

    this.updateState({});
  }
}
