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
