import AbstractView from './abstract.js';

const createFilterItemTemplate = (filter) => {
  const {name, count} = filter;
  return `<a href="#${name}" class="main-navigation__item">${name} <span class="main-navigation__item-count">${count}</span></a>`;
};

const createFilterTemplate = (filterItems) => {
  const filterItemsTemplate = filterItems.map((filter) => createFilterItemTemplate(filter)).join('');

  return `<div class="main-navigation__items">
    <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
    ${filterItemsTemplate}
  </div>`;
};

export default class Filter extends AbstractView {
  constructor(items) {
    super();
    this._items = items;
  }

  getTemplate() {
    return createFilterTemplate(this._items);
  }
}
