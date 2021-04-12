import {createElement} from '../utils.js';

const createNavStatsTemplate = () => {
  return '<a href="#stats" class="main-navigation__additional">Stats</a>';
};

export default class NavStats {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createNavStatsTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
