import AbstractView from './abstract.js';

const createFooterStatsTemplate = (films) => {
  return `<section class="footer__statistics">
    <p>${films} movies inside</p>
  </section>`;
};

export default class FooterStats extends AbstractView {
  constructor(stats) {
    super();
    this._stats = stats;
  }

  getTemplate() {
    return createFooterStatsTemplate(this._stats);
  }
}
