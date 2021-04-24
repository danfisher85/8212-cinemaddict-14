import dayjs from 'dayjs';

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

export const getRandomDate = (start, end, format = 'YYYY/MM/DD HH:mm') => {
  const newDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return dayjs(newDate).format(format);
};

export const formatFilmCardDate = (date) => {
  return dayjs(date).format('YYYY');
};

export const formatFilmPopupDate = (date) => {
  return dayjs(date).format('DD MMMM YYYY');
};

export const sortFilmDate = (filmA, filmB) => {
  return dayjs(filmB.releaseDate).diff(dayjs(filmA.releaseDate));
};

export const sortFilmRating = (filmA, filmB) => {
  return filmA.rating > filmB.rating ? -1 : 1;
};
