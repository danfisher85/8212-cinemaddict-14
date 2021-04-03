const getRandomInteger = (a = 0, b = 1, isFloor = true) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const num = lower + Math.random() * (upper - lower + 1);

  if (isFloor) {
    return Math.floor(num);
  }
  return +num.toFixed(1);
};

const generateTitle = () => {
  const titles = [
    'Made For Each Other',
    'Popeye Meets Sinbad',
    'Sagebrush Trail',
    'Santa Claus Conquers The Martians',
    'The Dance Of Life',
    'The Great Flamarion',
    'The Man With The Golden Arm',
  ];

  const randomIndex = getRandomInteger(0, titles.length - 1);

  return titles[randomIndex];
};

const generatePoster = () => {
  const posters = [
    'made-for-each-other.png',
    'popeye-meets-sinbad.png',
    'sagebrush-trail.jpg',
    'santa-claus-conquers-the-martians.jpg',
    'the-dance-of-life.jpg',
    'the-great-flamarion.jpg',
    'the-man-with-the-golden-arm.jpg',
  ];

  const randomIndex = getRandomInteger(0, posters.length - 1);

  return posters[randomIndex];
};

const generateGenre = () => {
  const genres = [
    'Drama',
    'Film-Noir',
    'Mystery',
    'Musical',
    'Western',
    'Drama',
    'Comedy',
    'Cartoon',
  ];

  const randomIndex = getRandomInteger(0, genres.length - 1);

  return genres[randomIndex];
};

const generateSentence = () => {
  const sentences = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'Cras aliquet varius magna, non porta ligula feugiat eget.',
    'Fusce tristique felis at fermentum pharetra.',
    'Aliquam id orci ut lectus varius viverra.',
    'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
    'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
    'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
    'Sed sed nisi sed augue convallis suscipit in sed felis.',
    'Aliquam erat volutpat.',
    'Nunc fermentum tortor ac porta dapibus.',
    'In rutrum ac purus sit amet tempus.',
  ];

  const randomIndex = getRandomInteger(0, sentences.length - 1);

  return sentences[randomIndex];
};

const generateDescription = () => {
  const randomDescriptionSize = getRandomInteger(1, 5);

  return new Array(randomDescriptionSize).fill().map(() => generateSentence());
};

const getHumanizedDuration = (minsTotal) => {
  const hours = Math.floor(minsTotal / 60);
  const mins = minsTotal % 60;
  const hoursOutput = hours ? hours + 'h ' : '';

  return hoursOutput + mins + 'm';
};

export const generateFilmCard = () => {
  return {
    title: generateTitle(),
    poster: generatePoster(),
    rating: getRandomInteger(1.0, 10.0, false),
    releaseDate: getRandomInteger(1900, 2000),
    duration: getHumanizedDuration(getRandomInteger(45, 180)),
    genre: generateGenre(),
    description: generateDescription(),
    commentCount: getRandomInteger(0, 5),
    isWatchListed: Boolean(getRandomInteger(0, 1)),
    isWatched: Boolean(getRandomInteger(0, 1)),
    isFavorite: Boolean(getRandomInteger(0, 1)),
  };
};
