import AbstractView from './abstract.js';

const createFilterItemTemplate = (filter, currentFilterType) => {
  const {type, name, count} = filter;
  return `<a href="#${type}" class="main-navigation__item ${type === currentFilterType ? 'main-navigation__item--active': ''}">${name} <span class="main-navigation__item-count">${count}</span></a>`;
};

const createFilterTemplate = (filterItems, currentFilterType) => {
  const filterItemsTemplate = filterItems.map((filter) => createFilterItemTemplate(filter, currentFilterType)).join('');

  return `<div class="main-navigation__items">
    ${filterItemsTemplate}
  </div>`;
};

export default class Filter extends AbstractView {
  constructor(items, currentFilterType) {
    super();
    this._items = items;
    this._currentFilter = currentFilterType;

    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createFilterTemplate(this._items, this._currentFilter);
  }

  _filterTypeChangeHandler(evt) {
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.href);
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement().addEventListener('click', this._filterTypeChangeHandler);
  }
}
