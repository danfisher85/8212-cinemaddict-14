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

export const countWatchedFilmDuration = (films) => {
  return films.reduce((acc, film) => acc + film.duration, 0);
};

export const getHumanizedDurationStats = (minsTotal) => {
  const hours = Math.floor(minsTotal / 60);
  const mins = minsTotal % 60;
  const hoursOutput = hours ? hours + '<span class="statistic__item-description">h</span> ' : '';

  return hoursOutput + mins + '<span class="statistic__item-description">m</span>';
};

export const getFilmGenreStats = (films) => {
  const results = {};

  films.reduce((acc, film) => acc.concat(film.genres), [])
    .forEach((genre) => {
      if (results[genre]) {
        results[genre]++;
        return;
      }
      results[genre] = 1;
    });
  return results;
};

export const getGenresLabels = (labels, counts, films) => {
  Object.entries(getFilmGenreStats(films))
    .sort((a, b) => b[1] - a[1])
    .forEach(([label, count]) => {
      labels.push(label);
      counts.push(count);
    });
};

export const getTopGenreLabels = (object) => {
  return Object.keys(object).filter((element) => {
    return object[element] === Math.max.apply(null, Object.values(object));
  }).join(', ');
};
