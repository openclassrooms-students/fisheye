export const thumbPhotographerFactory = (photographers) => {

  const getUserCard = (photographer) => {
    const { id, name, city, country, tagline, price, portrait } = photographer;

    const article = document.createElement("article");
    article.classList.add("photographer-card");

    article.innerHTML = `
        <a href="photographer.html?id=${id}" class="photographer-card__link" aria-label="lien vers la page de ${name}">
            <img class="photographer-card__img" src="assets/photographers/photos/${portrait}" alt="photo de ${name}">
            <h2 class="photographer-card__name">${name}</h2>
        </a>
        <div class="photographer-card__info">
            <p class="photographer-card__info__location">${city}, ${country}</p>
            <p class="photographer-card__info__tagline">${tagline}</p>
            <p class="photographer-card__info__price">${price}€/jour</p>
        </div>
        `;
    return article;
  };

  const getWrapper = (photographers) => {
    const wrapper = document.createElement("section");
    wrapper.classList.add("photographer_section");
    photographers.forEach((photographer) => {
      const userCard = getUserCard(photographer);
      wrapper.appendChild(userCard);
    });
    return wrapper;
  };

  return {
    getWrapper,
  };
};
