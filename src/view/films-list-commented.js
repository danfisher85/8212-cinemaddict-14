import AbstractView from './abstract.js';

const createFilmsListCommentedTemplate = () => {
  return `<section class="films-list films-list--extra films-list--commented">
    <h2 class="films-list__title">Most commented</h2>
  </section>`;
};

export default class FilmsListCommented extends AbstractView {
  getTemplate() {
    return createFilmsListCommentedTemplate();
  }
}
