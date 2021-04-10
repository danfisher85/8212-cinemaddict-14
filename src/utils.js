import dayjs from 'dayjs';

export const RenderPosition = {
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
};

export const render = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

export const createElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getRandomFloat = (a = 1, b = 0) => {
  const lower = Math.min(a, b);
  const upper = Math.max(a, b);
  const num = lower + Math.random() * (upper - lower);

  return +num.toFixed(1);
};

export const getRandomArrayElement = (array) => {
  return array[getRandomInteger(0, array.length-1)];
};

export const getUniqId = function () {
  return '-' + Math.random().toString(36).substr(2, 9);
};

export const getHumanizedDuration = (minsTotal) => {
  const hours = Math.floor(minsTotal / 60);
  const mins = minsTotal % 60;
  const hoursOutput = hours ? hours + 'h ' : '';

  return hoursOutput + mins + 'm';
};

export const getRandomArraySize = (min, max, array, isToString = true, isCommaSeparator = false) => {
  if (isToString) {
    return new Array(getRandomInteger(min, max)).fill().map(() => getRandomArrayElement(array)).join(isCommaSeparator ? ', ' : ' ');
  }
  return new Array(getRandomInteger(min, max)).fill().map(() => getRandomArrayElement(array));
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
