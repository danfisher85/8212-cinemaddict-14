import {createElement} from '../utils.js';

const createProfileTemplate = (user) => {
  const {
    rating,
    avatar,
  } = user;

  return `<section class="header__profile profile">
    <p class="profile__rating">${rating ? rating : ''}</p>
    <img class="profile__avatar" src="${avatar}" alt="Avatar" width="35" height="35">
  </section>`;
};

export default class ProfileHeader {
  constructor(user) {
    this._user = user;
    this._element = null;
  }

  getTemplate() {
    return createProfileTemplate(this._user);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
