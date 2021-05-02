import {FilterType} from '../const.js';

export const filter = {
  [FilterType.ALL]: (films) => films,
  [FilterType.WATCHLIST]: (films) => films.filter((film) => film.watchListed),
  [FilterType.HISTORY]: (films) => films.filter((film) => film.watched),
  [FilterType.FAVORITES]: (films) => films.filter((film) => film.favorite),
};
