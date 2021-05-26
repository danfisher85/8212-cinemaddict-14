import AbstractView from './abstract.js';

const createFilmsHolderTemplate = () => {
  return `<section class="films">
  </section>`;
};

export default class FilmsHolder extends AbstractView {
  getTemplate() {
    return createFilmsHolderTemplate();
  }
}
