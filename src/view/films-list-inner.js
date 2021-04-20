import AbstractView from './abstract.js';

const createFilmsListInnerTemplate = () => {
  return `<div class="films-list__container">
    </div>`;
};

export default class FilmsListInner extends AbstractView {
  getTemplate() {
    return createFilmsListInnerTemplate();
  }
}
