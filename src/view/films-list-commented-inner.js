import AbstractView from './abstract.js';

const createFilmsListCommentedInnerTemplate = () => {
  return `<div class="films-list__container">
    </div>`;
};

export default class FilmsListCommentedInner extends AbstractView {
  getTemplate() {
    return createFilmsListCommentedInnerTemplate();
  }
}
