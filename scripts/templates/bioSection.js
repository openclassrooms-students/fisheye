import { filterUser } from "../utils/filterUserData.js";

//  afficher la biographie du photographe
const bioSection = (photographers) => {
  const wrapper = document.querySelector(".bio-photographer");

  const { name, city, country, tagline, portrait } = filterUser(photographers);

  wrapper.innerHTML = `
        <div class="photographer-bio__info">
            <h1 class="photographer-bio__info__name">${name}</h1>
            <p class="photographer-bio__info__location">${city}, ${country}</p>
            <p class="photographer-bio__info__tagline">${tagline}</p>
        </div>
        <button class="photographer-bio__contact" aria-label="Contact Me">Contactez-moi</button>
        <img class="photographer-card__img" src="./assets/photographers/profile-picture/${portrait}" alt="photo de ${name}">
        `;
};

export default bioSection;
