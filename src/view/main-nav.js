import {createElement} from '../utils.js';

const createMainNavTemplate = () => {
  return `<nav class="main-navigation">
  </nav>`;
};

export default class MainNav {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createMainNavTemplate();
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
