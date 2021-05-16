import AbstractView from './abstract.js';
import {getPluralized} from '../utils/film.js';

const createFooterStatsTemplate = (films) => {
  return `<section class="footer__statistics">
    <p>${films} ${getPluralized(films, 'movie')} inside</p>
  </section>`;
};

export default class FooterStats extends AbstractView {
  constructor(films) {
    super();
    this._films = films;
  }

  getTemplate() {
    return createFooterStatsTemplate(this._films);
  }
}
