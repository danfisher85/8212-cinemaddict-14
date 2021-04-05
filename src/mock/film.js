import {TITLES, POSTERS, DIRECTORS, AUDIENCERATINGS, SENTENCES, GENRES, WRITERS, ACTORS} from '../const.js';
import {getRandomInteger, getRandomArrayElement, getRandomArraySize, getHumanizedDuration} from '../utils.js';
import {generateCommentsList} from './comment.js';

export const generateFilmCard = () => {
  return {
    title: getRandomArrayElement(TITLES),
    originalTitle: getRandomArrayElement(TITLES),
    director: getRandomArrayElement(DIRECTORS),
    writers: getRandomArraySize(1, 5, WRITERS),
    actors: getRandomArraySize(1, 10, ACTORS),
    audienceRating: getRandomInteger(AUDIENCERATINGS),
    poster: getRandomArrayElement(POSTERS),
    rating: getRandomInteger(1.0, 9.0, false),
    releaseDate: getRandomInteger(1900, 2000),
    duration: getHumanizedDuration(getRandomInteger(45, 180)),
    genres: getRandomArraySize(1, 5, GENRES, false),
    description: getRandomArraySize(1, 5, SENTENCES),
    comments: generateCommentsList(),
    isWatchListed: Boolean(getRandomInteger(0, 1)),
    isWatched: Boolean(getRandomInteger(0, 1)),
    isFavorite: Boolean(getRandomInteger(0, 1)),
  };
};
