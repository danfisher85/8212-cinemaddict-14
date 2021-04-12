import {createElement} from '../utils.js';

const createFooterStatsTemplate = (films) => {
  return `<section class="footer__statistics">
    <p>${films} movies inside</p>
  </section>`;
};

export default class FooterStats {
  constructor(stats) {
    this._stats = stats;
    this._element = null;
  }

  getTemplate() {
    return createFooterStatsTemplate(this._stats);
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
