export const createProfileTemplate = (user) => {
  const {
    rating,
    avatar,
  } = user;

  return `<section class="header__profile profile">
    <p class="profile__rating">${rating ? rating : ''}</p>
    <img class="profile__avatar" src="${avatar}" alt="Avatar" width="35" height="35">
  </section>`;
};
