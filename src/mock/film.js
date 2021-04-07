import {TITLES, POSTERS, DIRECTORS, AUDIENCERATINGS, SENTENCES, GENRES, WRITERS, ACTORS} from '../const.js';
import {getRandomInteger, getRandomFloat, getRandomArrayElement, getRandomArraySize, getHumanizedDuration, getRandomDate} from '../utils.js';
import {generateCommentsList} from './comment.js';

const getRandomCommentsId = () => {
  return Object.values(generateCommentsList()).map(({id}) => id);
};

const getRandomComments = getRandomCommentsId();

export const generateFilmCard = () => {
  return {
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
    comments: getRandomArraySize(0, getRandomComments.length, getRandomComments, false),
    isWatchListed: Boolean(getRandomInteger(0, 1)),
    isWatched: Boolean(getRandomInteger(0, 1)),
    isFavorite: Boolean(getRandomInteger(0, 1)),
  };
};
