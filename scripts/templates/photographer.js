import { fetchPhotographersData } from "../utils/fetchPhotographersData.js";
import { filterUser, sortUserMedia } from "../utils/filterUserData.js";
import { mediaFactory } from "../factories/mediaFactory.js";

export const photographer = async () => {
  let data = {};
  let currentSort = "popularity";
  let currentMediaIndex = 0;

  const heartSvg = `
        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="24" viewBox="0 0 21 24" fill="none">
            <g clip-path="url(#clip0_120_561)">
                <path d="M10.5 21.35L9.23125 20.03C4.725 15.36 1.75 12.28 1.75 8.5C1.75 5.42 3.8675 3 6.5625 3C8.085 3 9.54625 3.81 10.5 5.09C11.4537 3.81 12.915 3 14.4375 3C17.1325 3 19.25 5.42 19.25 8.5C19.25 12.28 16.275 15.36 11.7688 20.04L10.5 21.35Z" fill="#911C1C"/>
            </g>
            <defs>
                <clipPath id="clip0_120_561">
                <rect width="21" height="24" fill="white"/>
                </clipPath>
            </defs>
      </svg>`;

  //  Récupère les données du photographe
  try {
    data = await fetchPhotographersData(); // Attendez que les données soient récupérées avant de continuer
  } catch (error) {
    console.error(error);
  }

  // Méthode pour gérer le formulaire de contact
  const contactForm = () => {
    const { photographers } = data;
    const { name } = filterUser(photographers);

    const form = document.querySelector(".form-fields");
    const openFormButton = document.querySelector(".photographer-bio__contact");
    const formContainer = document.querySelector(".form-container");
    const formCloseButton = document.querySelector(".form-close");
    const formSubmitButton = document.querySelector(".btn-submit");
    const title = document.querySelector("#title");

    openFormButton.addEventListener("click", () => {
      formContainer.classList.add("open");
      title.textContent = `Contactez-moi ${name}`;
    });

    formCloseButton.addEventListener("click", () => {
      formContainer.classList.remove("open");
    });

    formSubmitButton.addEventListener("click", () => {
      formContainer.classList.remove("open");
    });

    // Gestion des événements clavier
    document.addEventListener("keydown", (event) => {
      if (event.code === "Escape") {
        formContainer.classList.remove("open");
      }
    });

    // log la valeur de l'input
    form.addEventListener("input", (e) => console.log("value", e.target.value));
  };

  // Méthode pour afficher la biographie du photographe
  const bioSection = () => {
    const { photographers } = data;

    const wrapper = document.querySelector(".bio-photographer");

    const { name, city, country, tagline, portrait } =
      filterUser(photographers);

    wrapper.innerHTML = `
        <div class="photographer-bio__info">
            <h1 class="photographer-bio__info__name">${name}</h1>
            <p class="photographer-bio__info__location">${city}, ${country}</p>
            <p class="photographer-bio__info__tagline">${tagline}</p>
        </div>
        <button class="photographer-bio__contact" aria-label="Contact Me" tabindex="-1">Contactez-moi</button>
        <img class="photographer-card__img" src="assets/photographers/photos/${portrait}" alt="photo de ${name}">
        `;
  };

  // Méthode pour gérer les boutons "J'aime" sur les médias
  const likeButton = () => {
    const likeButtons = document.querySelectorAll(".card-media__info__likes");

    likeButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const likes = button.querySelector(".card-media__info__likes__number");
        const countLikes = document.querySelector("#total-likes__number");
        // verifie si le bouton est like

        // Calculer la différence à ajouter ou soustraire au compteur de likes
        const difference = button.classList.contains("is-liked") ? 1 : -1;

        // Mettre à jour les classes CSS et le contenu du compteur de likes
        button.classList.toggle("is-liked");

        // Mettre à jour le compteur de likes dans le DOM
        likes.textContent = parseInt(likes.textContent) + difference;
        countLikes.textContent = parseInt(countLikes.textContent) + difference;
      });
    });
  };

  // Méthode pour générer le HTML des informations de chaque média
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

  // Méthode pour gérer le menu déroulant de tri des médias
  const dropdown = () => {
    const dropdownWrapper = document.querySelector("#dropdown-wrapper");
    const dropdownLinks = document.querySelectorAll(".dropdown-list a");
    const dropdownList = document.querySelector(".dropdown-list");

    // Sélection de l'élément span où afficher la valeur sélectionnée
    const selectedValueSpan = document.querySelector("#dropdown-title");

    // Gestion de l'événement clic sur le conteneur du dropdown
    dropdownWrapper.addEventListener("click", function () {
      this.classList.toggle("is-active");
      const expanded = this.classList.contains("is-active");
      dropdownWrapper.setAttribute("aria-expanded", expanded);
      dropdownList.setAttribute("aria-hidden", !expanded);
    });

    // Gestion de l'événement clic sur chaque lien dans la liste déroulante
    dropdownLinks.forEach((link) => {
      link.addEventListener("click", function (event) {
        // anuuler le comportement par défaut
        event.preventDefault();

        // Suppression de la classe "selected" de tous les parents d'éléments li
        dropdownLinks.forEach((item) => {
          item.parentElement.classList.remove("selected");
        });
        // Mise à jour de la valeur affichée dans l'élément span avec le texte du lien cliqué

        currentSort =
          event.currentTarget.getAttribute("data-sort") || currentSort; // Mettre à jour la variable sort
        selectedValueSpan.innerHTML = event.currentTarget.textContent;
        selectedValueSpan.parentElement.setAttribute("data-sort", currentSort);

        // Ajout de la classe "selected" au parent de l'élément lien cliqué
        this.parentElement.classList.add("selected");
        // dropdownButton.focus();

        // Mettez simplement à jour le contenu de la section media existante
        mediaSection();
      });
    });
  };

  // Méthode pour calculer le nombre total de likes et mettre à jour le DOM
  const counterLikes = () => {
    const { user, media } = sortUserMedia(data, currentSort);
    let countLikes = 0;
    const { price } = user;

    media.forEach((media) => {
      countLikes += media.likes;
    });

    const totalLikesContainer = document.querySelector(
      ".total-likes-container"
    );

    totalLikesContainer.innerHTML = `
      <div class="total-likes">
        <span id="total-likes__number">${countLikes}</span>
        ${heartSvg}
      </div>
      <p class="price">${price}€ / jour</p>
    `;
  };

  // Méthode pour mettre à jour l'état des boutons "Next" et "Previous"
  const updateButtonState = (media) => {
    const nextMediaBtn = document.querySelector(".lightbox__next");
    const prevMediaBtn = document.querySelector(".lightbox__prev");

    if (currentMediaIndex == 0) {
    }
    // Vérifier si nous atteignons le début du tableau des médias
    if (currentMediaIndex < 0 || currentMediaIndex === 0) {
      currentMediaIndex = 0;

      prevMediaBtn.disabled = true;
      prevMediaBtn.classList.add("hidden");
    } else {
      prevMediaBtn.disabled = false;
      prevMediaBtn.classList.remove("hidden");
    }

    // Cacher le bouton "Next" s'il n'y a pas de média suivant ou si nous sommes sur le dernier média
    if (
      currentMediaIndex >= media.length - 1 ||
      currentMediaIndex === media.length - 1
    ) {
      currentMediaIndex = media.length - 1;
      nextMediaBtn.disabled = true;
      nextMediaBtn.classList.add("hidden");
    } else {
      nextMediaBtn.disabled = false;
      nextMediaBtn.classList.remove("hidden");
    }
  };

  // Méthode pour afficher un média spécifique dans la lightbox
  const showMedia = (mediaIndex, media) => {
    const lightboxMedia = document.querySelector(".lightbox__media");
    const lightboxTitle = document.querySelector(".lightbox__title");

    // Vérifier si l'index est valide pour éviter les débordements du tableau
    if (mediaIndex >= 0 && mediaIndex < media.length) {
      const currentMedia = media[mediaIndex];
      lightboxMedia.setAttribute("data-id", currentMedia.id);
      lightboxMedia.innerHTML = "";

      lightboxMedia.appendChild(mediaFactory(currentMedia, true));
      lightboxTitle.textContent = currentMedia.title;
    }

    updateButtonState(media); // Mettre à jour l'état des boutons après avoir changé de média
  };

  // Méthode pour gérer le défilement des médias dans la lightbox
  const handleScrollMedia = (direction, media) => {
    // Incrémenter ou décrémenter l'index du média actuel en fonction de la direction
    if (direction === "next") {
      currentMediaIndex++;
    } else if (direction === "prev") {
      currentMediaIndex--;
    }

    showMedia(currentMediaIndex, media);
    updateButtonState(media); // Mettre à jour l'état des boutons après avoir changé de média
  };

  // Méthode pour afficher les médias du photographe dans la page
  const mediaSection = () => {
    const { media } = sortUserMedia(data, currentSort);

    const mediaSection = document.querySelector(".media");

    mediaSection.innerHTML = "";

    media.forEach((mediaCurrent, mediaCurrentIndex) => {
      const wrapper = document.createElement("figure");

      const lightbox = document.querySelector(".lightbox");
      const lightboxMedia = document.querySelector(".lightbox__media");
      const lightboxTitle = document.querySelector(".lightbox__title");
      const lightboxClose = document.querySelector(".lightbox__close");

      wrapper.classList.add("card-media");
      wrapper.setAttribute("data-id", mediaCurrent.id);

      const figcaption = document.createElement("figcaption");
      figcaption.classList.add("card-media__info");
      figcaption.innerHTML = infoCard(mediaCurrent);

      // lightbox
      wrapper.addEventListener("click", () => {
        lightbox.classList.add("open");
        lightboxMedia.innerHTML = "";

        lightboxMedia.setAttribute("data-id", mediaCurrent.id);
        lightboxMedia.appendChild(mediaFactory(mediaCurrent, true));
        lightboxTitle.textContent = mediaCurrent.title;
        currentMediaIndex = mediaCurrentIndex;
        updateButtonState(media); // Mettre à jour l'état des boutons après avoir changé de média

        lightboxClose.addEventListener("click", () => {
          lightbox.classList.remove("open");
        });

        document.addEventListener("keydown", (event) => {
          if (event.code === "Escape") {
            lightbox.classList.remove("open");
          }
        });
      });

      wrapper.appendChild(mediaFactory(mediaCurrent));
      wrapper.appendChild(figcaption);
      mediaSection.appendChild(wrapper);
    });

    likeButton(); // les gestionnaires d'événements pour les nouveaux boutons "like".
    counterLikes(); // Mettre à jour le nombre total de likes

    const nextMediaBtn = document.querySelector(".lightbox__next");
    nextMediaBtn.addEventListener("click", () => {
      handleScrollMedia("next", media); // Appeler la fonction handleScrollMedia avec la direction "next"
    });

    const prevMediaBtn = document.querySelector(".lightbox__prev");
    prevMediaBtn.addEventListener("click", () => {
      handleScrollMedia("prev", media); // Appeler la fonction handleScrollMedia avec la direction "prev"
    });
  };

  return {
    bioSection,
    contactForm,
    dropdown,
    mediaSection,
  };
};
