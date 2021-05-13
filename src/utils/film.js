import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export const getHumanizedDuration = (minsTotal) => {
  const hours = Math.floor(minsTotal / 60);
  const mins = minsTotal % 60;
  const hoursOutput = hours ? hours + 'h ' : '';

  return hoursOutput + mins + 'm';
};

export const getTruncatedText = (text) => {
  if (text.length > 139) {
    const truncatedText = text.substring(0, 139) + '...';
    return truncatedText;
  }
  return text;
};

export const getRandomDate = (start, end) => {
  const newDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return dayjs(newDate).format();
};

export const getFilmCardDate = (date) => {
  return dayjs(date).format('YYYY');
};

export const getFilmPopupDate = (date) => {
  return dayjs(date).format('DD MMMM YYYY');
};

export const getCommentHumaziedDate = (date) => {
  return dayjs(date).fromNow();
};

export const sortFilmDate = (filmA, filmB) => {
  return dayjs(filmB.releaseDate).diff(dayjs(filmA.releaseDate));
};

export const sortFilmRating = (filmA, filmB) => {
  return filmA.rating > filmB.rating ? -1 : 1;
};

// source https://www.30secondsofcode.org/js/s/pluralize
export const getPluralized = (val, word, plural = word + 's') => {
  const _pluralize = (num, word, plural = word + 's') =>
    [1, -1].includes(Number(num)) ? word : plural;
  return _pluralize(val, word, plural);
};

export const getWatchedFilmsCount = (films) => {
  let filmCounter = 0;

  films.forEach((film) => {
    if (film.watched) {
      filmCounter += 1;
    }
  });

  return filmCounter;
};
