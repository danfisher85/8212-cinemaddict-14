import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';
import isBetween from 'dayjs/plugin/isBetween';
import {StatsFilterType} from '../const.js';

dayjs.extend(isToday);
dayjs.extend(isBetween);

const now = dayjs();
const week = dayjs().subtract(1, 'week');
const month = dayjs().subtract(1, 'month');
const year = dayjs().subtract(1, 'year');

export const statsFilter = {
  [StatsFilterType.ALL]: (films) => films.filter((film) => film.watched),
  [StatsFilterType.TODAY]: (films) => films.filter((film) => film.watched && dayjs(film.watchedDate).isToday()),
  [StatsFilterType.WEEK]: (films) => films.filter((film) => film.watched && dayjs(film.watchedDate).isBetween(now, week)),
  [StatsFilterType.MONTH]: (films) => films.filter((film) => film.watched && dayjs(film.watchedDate).isBetween(now, month)),
  [StatsFilterType.YEAR]: (films) => films.filter((film) => film.watched && dayjs(film.watchedDate).isBetween(now, year)),
};

export const countWatchedFilmInDateRange = (films, currentFilterType) => {
  let filteredFilms = null;
  switch (currentFilterType) {
    case StatsFilterType.ALL:
      filteredFilms = statsFilter[StatsFilterType.ALL](films);
      break;
    case StatsFilterType.TODAY:
      filteredFilms = statsFilter[StatsFilterType.TODAY](films);
      break;
    case StatsFilterType.WEEK:
      filteredFilms = statsFilter[StatsFilterType.WEEK](films);
      break;
    case StatsFilterType.MONTH:
      filteredFilms = statsFilter[StatsFilterType.MONTH](films);
      break;
    case StatsFilterType.YEAR:
      filteredFilms = statsFilter[StatsFilterType.YEAR](films);
      break;
  }

  return filteredFilms;
};
