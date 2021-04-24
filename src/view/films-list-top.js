import AbstractView from './abstract.js';

const createFilmsListTopTemplate = () => {
  return `<section class="films-list films-list--extra films-list--top">
    <h2 class="films-list__title">Top rated</h2>
  </section>`;
};

export default class FilmsListTop extends AbstractView {
  getTemplate() {
    return createFilmsListTopTemplate();
  }
}
