import AbstractView from './abstract.js';

const createFilmsTemplate = () => {
  return `<section class="films">
  </section>`;
};

export default class FilmHolder extends AbstractView {
  getTemplate() {
    return createFilmsTemplate();
  }
}
