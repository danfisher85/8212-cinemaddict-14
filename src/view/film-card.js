const truncateText = (text) => {
  if (text.length > 139) {
    const truncatedText = text.substring(0, 139) + '...';
    return truncatedText;
  }
  return text;
};

export const createFilmCardTemplate = (film) => {
  const {
    title,
    poster,
    rating,
    releaseDate,
    duration,
    genre,
    description,
    comments,
    isWatchListed,
    isWatched,
    isFavorite
  } = film;

  const watchListClassName = isWatchListed ? 'film-card__controls-item--active' : '';
  const watchedClassName = isWatched ? 'film-card__controls-item--active' : '';
  const favoriteClassName = isFavorite ? 'film-card__controls-item--active' : '';
  const commentCount = comments.length;

  console.log(comments);

  return `<article class="film-card">
    <h3 class="film-card__title">${title}</h3>
    <p class="film-card__rating">${rating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${releaseDate}</span>
      <span class="film-card__duration">${duration}</span>
      <span class="film-card__genre">${genre[0]}</span>
    </p>
    <img src="./images/posters/${poster}" alt="" class="film-card__poster">
    <p class="film-card__description">${truncateText(description)}</p>
    <a class="film-card__comments">${commentCount} comments</a>
    <div class="film-card__controls">
      <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${watchListClassName}" type="button">Add to watchlist</button>
      <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${watchedClassName}" type="button">Mark as watched</button>
      <button class="film-card__controls-item button film-card__controls-item--favorite ${favoriteClassName}" type="button">Mark as favorite</button>
    </div>
  </article>`;
};
