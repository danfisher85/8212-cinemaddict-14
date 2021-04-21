import AbstractView from './abstract.js';

const createFilmsListTopInnerTemplate = () => {
  return `<div class="films-list__container">
    </div>`;
};

export default class FilmsListTopInner extends AbstractView {
  getTemplate() {
    return createFilmsListTopInnerTemplate();
  }
}
