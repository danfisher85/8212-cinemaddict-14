const getRandomInteger = (a = 0, b = 1, isFloor = true) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const num = lower + Math.random() * (upper - lower + 1);

  if (isFloor) {
    return Math.floor(num);
  }
  return +num.toFixed(1);
};

const generateComment = () => {
  const comments = [
    {
      id: 1,
      text: 'Interesting setting and a good cast',
      emoji: 'smile',
      author: 'Tim Macoveev',
      date: '2019/12/31 23:59',
    },
    {
      id: 2,
      text: 'Booooooooooring',
      emoji: 'sleeping',
      author: 'John Doe',
      date: '2 days ago',
    },
    {
      id: 3,
      text: 'Very very old. Meh',
      emoji: 'puke',
      author: 'John Doe',
      date: '2 days ago',
    },
    {
      id: 4,
      text: 'Almost two hours? Seriously?',
      emoji: 'angry',
      author: 'John Doe',
      date: 'Today',
    },
  ];

  const randomIndex = getRandomInteger(0, comments.length - 1);

  return comments[randomIndex];
};

const generateCommentsList = () => {
  return new Array(getRandomInteger(0, 5)).fill().map(() => generateComment());
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

const generateFilmGenres = () => {
  return new Array(getRandomInteger(1, 5)).fill().map(() => generateGenre());
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
  return new Array(getRandomInteger(1, 5)).fill().map(() => generateSentence()).join('');
};

const generateDirector = () => {
  const directors = [
    'Alfred Hitchcock',
    'Stanley Kubrick',
    'Akira Kurosawa',
    'Steven Spielberg',
    'Martin Scorsese',
    'Quentin Tarantino',
    'Ingmar Bergman',
    'Federico Fellini',
    'Francis Ford Coppola',
    'David Lynch',
  ];

  const randomIndex = getRandomInteger(0, directors.length - 1);

  return directors[randomIndex];
};

const generateWriter = () => {
  const writers = [
    'Anne Wigton',
    'Heinz Herald',
    'Richard Weil',
    'Jonathan Swift',
    'Samuel Johnson',
    'Johann Wolfgang von Goethe',
    'Jane Austen',
    'Alexandre Dumas',
    'Victor Hugo',
    'Charles Dickens',
  ];

  const randomIndex = getRandomInteger(0, writers.length - 1);

  return writers[randomIndex];
};

const generateWriterCrew = () => {
  return new Array(getRandomInteger(1, 5)).fill().map(() => generateWriter()).join('');
};

const generateActor = () => {
  const actors = [
    'Robert De Niro',
    'Jack Nicholson',
    'Marlon Brando',
    'Denzel Washington',
    'Katharine Hepburn',
    'Meryl Streep',
    'Daniel Day-Lewis',
    'Sidney Poitier',
    'Clark Gable',
    'Ingrid Bergman',
  ];

  const randomIndex = getRandomInteger(0, actors.length - 1);

  return actors[randomIndex];
};

const generateActorStaff = () => {
  return new Array(getRandomInteger(1, 10)).fill().map(() => generateActor()).join('');
};

const generateAudienceRating = () => {
  const ratings = [
    'G',
    'PG',
    'PG-13',
    'R',
    'NC-17',
    '18+',
  ];

  const randomIndex = getRandomInteger(0, ratings.length - 1);

  return ratings[randomIndex];
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
    originalTitle: generateTitle(),
    director: generateDirector(),
    writers: generateWriterCrew(),
    actors: generateActorStaff(),
    audienceRating: generateAudienceRating(),
    poster: generatePoster(),
    rating: getRandomInteger(1.0, 9.0, false),
    releaseDate: getRandomInteger(1900, 2000),
    duration: getHumanizedDuration(getRandomInteger(45, 180)),
    genre: generateFilmGenres(),
    description: generateDescription(),
    comments: generateCommentsList(),
    isWatchListed: Boolean(getRandomInteger(0, 1)),
    isWatched: Boolean(getRandomInteger(0, 1)),
    isFavorite: Boolean(getRandomInteger(0, 1)),
  };
};
