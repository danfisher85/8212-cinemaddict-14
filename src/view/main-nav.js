import AbstractView from './abstract.js';
import {NavItem} from '../const.js';

const createNavTemplate = () => {
  return `<nav class="main-navigation">
    <a href="#${NavItem.STATS}" class="main-navigation__additional">Stats</a>
  </nav>`;
};

export default class MainNav extends AbstractView {
  constructor() {
    super();

    this._navClickHandler = this._navClickHandler.bind(this);
  }

  getTemplate() {
    return createNavTemplate();
  }

  setNavClickHandler(callback) {
    this._callback.navClick = callback;
    this.getElement().addEventListener('click', this._navClickHandler);
  }

  _navClickHandler(evt) {
    evt.preventDefault();

    const currentItem = evt.target;

    if (currentItem.tagName !== 'A') {
      return;
    }

    if (currentItem.getAttribute('href') === `#${NavItem.STATS}`) {
      this.getElement().querySelectorAll('.main-navigation__item').forEach((item) => {
        item.classList.remove('main-navigation__item--active');
      });
      currentItem.classList.add('main-navigation__additional--active');
      this._callback.navClick(NavItem.STATS);
      return;
    }

    this.getElement().querySelector(`[href="#${NavItem.STATS}"]`).classList.remove('main-navigation__additional--active');
    currentItem.classList.add('main-navigation__item--active');
    this._callback.navClick(NavItem.FILMS);
  }

}
