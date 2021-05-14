import {nanoid} from 'nanoid';
import {TITLES, POSTERS, DIRECTORS, COUNTRIES, AUDIENCERATINGS, SENTENCES, GENRES, WRITERS, ACTORS} from '../const.js';
import {getHumanizedDuration, getRandomDate} from '../utils/film.js';
import {getRandomInteger, getRandomFloat, getRandomArrayElement, getRandomArraySize} from '../utils/common.js';

const getRandomCommentsId = (comments) => {
  const length = comments.length;

  return new Array(length).fill().map(() => {
    return comments.length ? comments[getRandomInteger(0, comments.length - 1)].id : '';
  });
};

const generateFilmCard = (comments) => {

  const commentsList = getRandomCommentsId(comments);
  const uniqueComments = commentsList.filter((item, index) => {
    return commentsList.indexOf(item) === index;
  });

  return {
    id: nanoid(),
    title: getRandomArrayElement(TITLES),
    originalTitle: getRandomArrayElement(TITLES),
    director: getRandomArrayElement(DIRECTORS),
    writers: getRandomArraySize(1, 5, WRITERS, true, true),
    actors: getRandomArraySize(1, 10, ACTORS, true, true),
    audienceRating: getRandomArrayElement(AUDIENCERATINGS),
    poster: getRandomArrayElement(POSTERS),
    rating: getRandomFloat(1, 10),
    country: getRandomArrayElement(COUNTRIES),
    releaseDate: getRandomDate(new Date(1910, 12, 31), new Date()),
    duration: getHumanizedDuration(getRandomInteger(45, 180)),
    genres: getRandomArraySize(1, 5, GENRES, false),
    description: getRandomArraySize(1, 5, SENTENCES),
    comments: uniqueComments,
    watchListed: Boolean(getRandomInteger(0, 1)),
    watched: Boolean(getRandomInteger(0, 1)),
    watchedDate: getRandomDate(new Date(2021, 1, 1), new Date()),
    favorite: Boolean(getRandomInteger(0, 1)),
  };
};

export const generateFilms = (count, comments) => {
  return new Array(count).fill('').map(() => generateFilmCard(comments));
};
