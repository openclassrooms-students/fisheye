import { mediaFactory } from "../factories/mediaFactory.js";
let currentMediaIndex = 0;

const lightboxClose = document.querySelector(".lightbox__close");
const lightboxNext = document.querySelector(".lightbox__next");
const lightboxPrev = document.querySelector(".lightbox__prev");

// afficher un média spécifique dans la lightbox
const showMedia = (mediaIndex, media) => {
  const lightboxMedia = document.querySelector(".lightbox__content");

  if (currentMediaIndex >= 0 && currentMediaIndex <= media.length) {
    updateButtonState(media);
    const currentMedia = media[mediaIndex];
    // Supprimer le contenu existant de la lightbox
    lightboxMedia.innerHTML = "";

    // Créer un élément HTML pour le média actuel et l'ajouter à la lightbox
    const lightboxTitle = document.createElement("p");
    lightboxTitle.classList.add("lightbox__title");
    lightboxTitle.textContent = currentMedia.title;

    lightboxMedia.appendChild(
      mediaFactory(currentMedia, true, "Lilac breasted roller")
    );

    lightboxMedia.appendChild(lightboxTitle);
  }
};

// gérer le défilement des médias dans la lightbox
const handleScrollMedia = (direction, media) => {
  // Incrémenter ou décrémenter l'index du média actuel en fonction de la direction
  if (direction === "next" && currentMediaIndex < media.length - 1) {
    currentMediaIndex++;
    showMedia(currentMediaIndex, media);
  } else if (direction === "prev" && currentMediaIndex > 0) {
    currentMediaIndex--;
    showMedia(currentMediaIndex, media);
  }
};

// mettre à jour l'état des boutons "Next" et "Previous"
const updateButtonState = (media) => {
  // Vérifier si nous atteignons le début du tableau des médias
  if (currentMediaIndex === 0) {
    lightboxPrev.disabled = true;
    lightboxPrev.classList.add("disabled");

    currentMediaIndex = 0;
  } else {
    lightboxPrev.disabled = false;
    lightboxPrev.classList.remove("disabled");
  }

  // Cacher le bouton "Next" s'il n'y a pas de média suivant ou si nous sommes sur le dernier média
  if (currentMediaIndex === media.length - 1) {
    currentMediaIndex = media.length - 1;
    lightboxNext.disabled = true;
    lightboxNext.classList.add("disabled");
  } else {
    lightboxNext.disabled = false;
    lightboxNext.classList.remove("disabled");
  }
};

const disableScroll = (event) => {
  event.preventDefault();
};

const handleTabKey = (event) => {
  if (event.code === "Tab") {
    const elementTarget = event.target;
    const arrayElements = [lightboxClose, lightboxNext, lightboxPrev];
    if (!arrayElements.includes(elementTarget)) {
      event.preventDefault();
      arrayElements[0].focus(); // Mettre le focus sur le premier élément du tableau arrayElements
    }
  }
};

const removeEventListener = () => {
  document.removeEventListener("wheel", disableScroll);
  document.removeEventListener("keydown", handleTabKey);
};

const displayLightbox = (media, mediaCardCurrentElement) => {
  const lightbox = document.querySelector(".lightbox");

  const mediaCurrentIndex = media.findIndex(
    (media) => media.id === parseInt(mediaCardCurrentElement.dataset.id)
  );

  currentMediaIndex = mediaCurrentIndex;

  lightbox.classList.add("open");

  showMedia(mediaCurrentIndex, media);

  lightboxClose.addEventListener("click", () => {
    lightbox.classList.remove("open");
    removeEventListener();
  });

  lightboxNext.addEventListener("click", () => {
    handleScrollMedia("next", media);
  });

  lightboxPrev.addEventListener("click", () => {
    handleScrollMedia("prev", media);
  });

  // Gestion des événements clavier
  document.addEventListener("keydown", (event) => {
    if (event.code === "ArrowRight") {
      handleScrollMedia("next", media);
      lightboxNext.focus();
    }
    if (event.code === "ArrowLeft") {
      handleScrollMedia("prev", media);
      lightboxPrev.focus();
    }
    if (event.code === "Escape") {
      lightbox.classList.remove("open");
      removeEventListener();
    }
  });

  document.addEventListener("wheel", disableScroll, { passive: false });
  document.addEventListener("keydown", handleTabKey);
};

const lightbox = (media) => {
  const mediaCardImgAll = document.querySelectorAll(".card-media__media");
  const mediaCardLinks = document.querySelectorAll(".card-media__link");

  mediaCardImgAll.forEach((mediaCardImg) => {
    mediaCardImg.addEventListener("click", () => {
      displayLightbox(media, mediaCardImg);
    });
  });

  mediaCardLinks.forEach((mediaCardLink) => {
    const mediaCardImg = mediaCardLink.querySelector(".card-media__media");
    mediaCardLink.addEventListener("keydown", (event) => {
      if (event.code === "Enter") {
        displayLightbox(media, mediaCardImg);
      }
    });
  });
};

export default lightbox;
