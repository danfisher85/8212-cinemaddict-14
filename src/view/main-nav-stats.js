import AbstractView from './abstract.js';

const createNavStatsTemplate = () => {
  return '<a href="#stats" class="main-navigation__additional">Stats</a>';
};

export default class NavStats extends AbstractView {
  getTemplate() {
    return createNavStatsTemplate();
  }
}
