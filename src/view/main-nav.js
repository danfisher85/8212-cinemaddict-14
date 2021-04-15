import AbstractView from './abstract.js';

const createMainNavTemplate = () => {
  return `<nav class="main-navigation">
  </nav>`;
};

export default class MainNav extends AbstractView {
  getTemplate() {
    return createMainNavTemplate();
  }
}
