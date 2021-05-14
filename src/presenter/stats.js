import StatsView from '../view/stats.js';
import {render, RenderPosition, replace, remove} from '../utils/render.js';
import {statsFilter} from '../utils/stats.js';
import {NavItem, StatsFilterType} from '../const.js';

export default class Stats {
  constructor(statsContainer, filmsModel, currentScreen) {
    this._statsContainer = statsContainer;
    this._filmsModel = filmsModel;
    this._films = this._filmsModel.getFilms();
    this._currentScreen = currentScreen;

    this._statsComponent = null;

    this._currentFilterType = StatsFilterType.ALL;

    this._handleFilterTypeChange = this._handleFilterTypeChange.bind(this);

    this._filmsModel.addObserver(this._handleFilterTypeChange);
  }

  init() {
    this._renderStats(this._films, this._films);
  }

  show() {
    this._statsComponent.show();
  }

  hide() {
    this._statsComponent.hide();
  }

  _getFilters() {
    return [
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
  }

  _handleFilterTypeChange(filterType){
    const films = this._filmsModel.getFilms();
    let filteredFilms = films;

    this._currentFilterType = filterType;

    switch(filterType) {
      case StatsFilterType.ALL:
        filteredFilms = statsFilter[StatsFilterType.ALL](films);
        break;
      case StatsFilterType.TODAY:
        filteredFilms = statsFilter[StatsFilterType.TODAY](films);
        break;
      case StatsFilterType.WEEK:
        filteredFilms = statsFilter[StatsFilterType.WEEK](films);
        break;
      case StatsFilterType.MONTH:
        filteredFilms = statsFilter[StatsFilterType.MONTH](films);
        break;
      case StatsFilterType.YEAR:
        filteredFilms = statsFilter[StatsFilterType.YEAR](films);
        break;
    }

    this._clearStats();
    this._renderStats(films, filteredFilms);
  }

  _renderStats(films, filteredFilms) {
    const filters = this._getFilters();

    if (this._statsComponent !== null) {
      this._statsComponent = null;
    }

    this._statsComponent = new StatsView(films, filteredFilms, filters, this._currentFilterType);
    this._statsComponent.setFilterTypeChangeHandler(this._handleFilterTypeChange);

    render(this._statsContainer, this._statsComponent, RenderPosition.BEFOREEND);
  }

  _clearStats() {
    remove(this._statsComponent);
  }
}
