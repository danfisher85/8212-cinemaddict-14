const filmToFilterMap = {
  watchlist: (films) => films.filter((film) => film.watchListed).length,
  history: (films) => films.filter((film) => film.watched).length,
  favorites: (films) => films.filter((film) => film.favorite).length,
};

export const generateFilter = (films) => {
  return Object.entries(filmToFilterMap).map(([filterName, countFilms]) => {
    return {
      name: filterName,
      count: countFilms(films),
    };
  });
};
