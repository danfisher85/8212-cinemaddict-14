import Observer from '../utils/observer.js';

export default class Films extends Observer {
  constructor() {
    super();
    this._films = [];
  }

  set(updateType, films) {
    this._films = films.slice();

    this._notify(updateType);
  }

  get() {
    return this._films;
  }

  update(updateType, update) {
    const index = this._films.findIndex((film) => film.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting film');
    }

    this._films = [
      ...this._films.slice(0, index),
      update,
      ...this._films.slice(index + 1),
    ];

    this._notify(updateType, update);
  }

  static adaptToClient(film) {
    const adaptedFilm = Object.assign(
      {},
      film,
      {
        title: film.film_info.title,
        originalTitle: film.film_info.alternative_title,
        rating: film.film_info.total_rating,
        poster: film.film_info.poster,
        audienceRating: film.film_info.age_rating,
        director: film.film_info.director,
        writers: film.film_info.writers,
        actors: film.film_info.actors,
        releaseDate: film.film_info.release.date,
        country: film.film_info.release.release_country,
        duration: film.film_info.runtime,
        genres: film.film_info.genre,
        description: film.film_info.description,
        watchListed: film.user_details.watchlist,
        watched: film.user_details.already_watched,
        watchedDate: film.user_details.watching_date,
        favorite: film.user_details.favorite,
      },
    );

    delete adaptedFilm.film_info;
    delete adaptedFilm.user_details;

    return adaptedFilm;
  }

  static adaptToServer(film) {
    const adaptedFilm = Object.assign(
      {},
      film,
      {
        'film_info': {
          'title': film.title,
          'alternative_title': film.originalTitle,
          'total_rating': film.rating,
          'poster': film.poster,
          'age_rating': film.audienceRating,
          'director': film.director,
          'writers': film.writers,
          'actors': film.actors,
          'release': {
            'date': film.releaseDate,
            'release_country': film.country,
          },
          'runtime': film.duration,
          'genre': film.genres,
          'description': film.description,
        },
        'user_details': {
          'watchlist': film.watchListed,
          'already_watched': film.watched,
          'watching_date': film.watchedDate,
          'favorite': film.favorite,
        },
      },
    );

    delete adaptedFilm.title;
    delete adaptedFilm.originalTitle;
    delete adaptedFilm.rating;
    delete adaptedFilm.poster;
    delete adaptedFilm.audienceRating;
    delete adaptedFilm.director;
    delete adaptedFilm.writers;
    delete adaptedFilm.actors;
    delete adaptedFilm.releaseDate;
    delete adaptedFilm.country;
    delete adaptedFilm.duration;
    delete adaptedFilm.genres;
    delete adaptedFilm.description;
    delete adaptedFilm.watchListed;
    delete adaptedFilm.watched;
    delete adaptedFilm.watchedDate;
    delete adaptedFilm.favorite;

    return adaptedFilm;
  }
}
