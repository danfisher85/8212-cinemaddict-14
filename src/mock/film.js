import {nanoid} from 'nanoid';
import {TITLES, POSTERS, DIRECTORS, AUDIENCERATINGS, SENTENCES, GENRES, WRITERS, ACTORS} from '../const.js';
import {getHumanizedDuration, getRandomDate} from '../utils/film.js';
import {getRandomInteger, getRandomFloat, getRandomArrayElement, getRandomArraySize} from '../utils/common.js';
import {generateComment} from './comment.js';

const generateFilmCard = () => {
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
    releaseDate: getRandomDate(new Date(1910, 12, 31), new Date()),
    duration: getHumanizedDuration(getRandomInteger(45, 180)),
    genres: getRandomArraySize(1, 5, GENRES, false),
    description: getRandomArraySize(1, 5, SENTENCES),
    comments: new Array(getRandomInteger(0, 5)).fill().map(() => generateComment(nanoid())),
    isWatchListed: Boolean(getRandomInteger(0, 1)),
    isWatched: Boolean(getRandomInteger(0, 1)),
    isFavorite: Boolean(getRandomInteger(0, 1)),
  };
};

export const generateFilms = (count) => {
  return new Array(count).fill().map(() => generateFilmCard());
};
