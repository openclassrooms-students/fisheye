import { mediaFactory } from "../factories/mediaFactory.js";
import { sortUserMedia } from "../utils/filterUserData.js";
import heartSvg from "./heartSvg.js";
import lightbox from "./lightbox.js";

const infoCard = ({ title, likes }) => {
  return `
        <p class="card-media__info__desc">
        ${title}
        </p>
        <button class="card-media__info__likes" aria-label="likes" tabindex="-1">
          <span class="card-media__info__likes__number">${likes}</span>
          ${heartSvg}
        </button>
    `;
};

// Les boutons "J'aime" sur les médias
const likeButton = () => {
  const likeButtons = document.querySelectorAll(".card-media__info__likes");

  likeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const likes = button.querySelector(".card-media__info__likes__number");
      const countLikes = document.querySelector("#total-likes__number");
      // verifie si le bouton est like

      // Calculer la différence à ajouter ou soustraire au compteur de likes
      const difference = button.classList.contains("is-liked") ? -1 : 1;

      // Mettre à jour les classes CSS et le contenu du compteur de likes
      button.classList.toggle("is-liked");

      // Mettre à jour le compteur de likes dans le DOM
      likes.textContent = parseInt(likes.textContent) + difference;
      countLikes.textContent = parseInt(countLikes.textContent) + difference;
    });
  });
};

const mediaSection = (data, currentSort) => {
  const { media } = sortUserMedia(data, currentSort);

  const mediaSection = document.querySelector(".media");

  mediaSection.innerHTML = "";

  media.forEach((mediaCurrent) => {
    const wrapper = document.createElement("div");
    wrapper.classList.add("card-media");

    const link = document.createElement("a");
    link.classList.add("card-media__link");
    link.href = "#";
    link.role = "button";
    link.ariaLabel = mediaCurrent.title;

    const footer = document.createElement("div");
    footer.classList.add("card-media__info");
    footer.innerHTML = infoCard(mediaCurrent);

    link.appendChild(mediaFactory(mediaCurrent));
    wrapper.appendChild(link);
    wrapper.appendChild(footer);
    mediaSection.appendChild(wrapper);
  });

  likeButton(); // les gestionnaires d'événements pour les nouveaux boutons "like".

  lightbox(media); // Gestionnaire d'événements pour les images de la carte média
};

export default mediaSection;
