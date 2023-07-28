import { fetchPhotographersData } from "../utils/fetchPhotographersData.js";
import { filterUser, sortUserMedia } from "../utils/filterUserData.js";
import { mediaFactory } from "../factories/mediaFactory.js";
import { contactFormFactory } from "../factories/contactFormFactory.js";

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

    // Définition des messages d'erreur du formulaire
    const messageInputError = {
      msg: "Ce champ est obligatoire",
      firstName: {
        min: 2,
        msg: "Veuillez entrer 2 caractères ou plus pour le champ du prénom.",
      },
      lastName: {
        min: 2,
        msg: "Veuillez entrer 2 caractères ou plus pour le champ du nom.",
      },
      email: {
        msg: "Veuillez entrer une adresse email valide.",
      },
      message: {
        min: 10,
        msg: "Veuillez écrire votre message dans le champ.",
      },
    };

    const form = document.querySelector(".form-fields");
    const openFormButton = document.querySelector(".photographer-bio__contact");
    const formContainer = document.querySelector(".form-container");
    const formWrapper = document.querySelector(".form-wrapper");
    const formCloseButton = document.querySelector(".form-close");
    const title = document.querySelector("#title");

    formWrapper.ariaHidden = "true";
    formWrapper.ariaLabelledby = `Contact me ${name}`;

    openFormButton.addEventListener("click", () => {
      formContainer.classList.add("open");
      formWrapper.ariaHidden = "false";
      title.textContent = `Contactez-moi ${name}`;
      document.addEventListener("wheel", disableScroll, { passive: false });
      document.addEventListener("keydown", handleTabKey);
    });

    formCloseButton.addEventListener("click", () => {
      formContainer.classList.remove("open");
      form.reset();
      document.removeEventListener("wheel", disableScroll);
      document.removeEventListener("keydown", handleTabKey);
    });

    const disableScroll = (event) => {
      event.preventDefault();
    };

    // Gestion des événements clavier
    document.addEventListener("keydown", (event) => {
      if (event.code === "Escape") {
        formContainer.classList.remove("open");
        form.reset();
      }
    });

    // Fonction pour gérer l'événement clavier et empêcher la navigation en dehors du formulaire
    const handleTabKey = (event) => {
      if (event.key === "Tab") {
        const elementTarget = event.target;

        const elements = form.elements;
        const arrayElements = Array.from(elements);
        arrayElements.unshift(formCloseButton);

        if (!arrayElements.includes(elementTarget)) {
          event.preventDefault();
          arrayElements[0].focus(); // Mettre le focus sur le premier élément du tableau arrayElements
        }
      }
    };

    // form.addEventListener("keydown", handleTabKey);

    form.addEventListener("input", (e) => {
      const id = e.target.id;
      contactFormFactory(id, messageInputError[id]);
    });

    // log la valeur de l'input
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      // recuper les valeurs des inputs du formulaire
      const elements = e.target.elements;

      // parcoure les elements du formulaire
      const values = Object.values(elements)
        .slice(0, 4)
        .map((element) =>
          contactFormFactory(element.id, messageInputError[element.id])
        );

      const isValid = values.every((value) => value === true);

      if (isValid) {
        formContainer.classList.remove("open");
        Object.values(elements)
          .slice(0, 4)
          .forEach((element) => {
            console.log(element.id, element.value);
          });

        form.reset();
      }
    });
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
        <button class="photographer-bio__contact" aria-label="Contact Me">Contactez-moi</button>
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
        const difference = button.classList.contains("is-liked") ? -1 : 1;

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
    const dropdownLinks = document.querySelectorAll(".dropdown-list button");
    const dropdownList = document.querySelector(".dropdown-list");

    // Sélection de l'élément span où afficher la valeur sélectionnée
    const selectedValueSpan = document.querySelector("#dropdown-title");

    // Gestion de l'événement clic sur le conteneur du dropdown
    dropdownWrapper.addEventListener("click", displayDropdown);

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

    function displayDropdown() {
      dropdownWrapper.classList.toggle("is-active");
      const expanded = this.classList.contains("is-active");
      dropdownWrapper.setAttribute("aria-expanded", expanded);
      dropdownList.setAttribute("aria-hidden", !expanded);
    }
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
    const lightboxNext = document.querySelector(".lightbox__next");
    const lightboxPrev = document.querySelector(".lightbox__prev");

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

  // Méthode pour afficher un média spécifique dans la lightbox
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

  // Méthode pour gérer le défilement des médias dans la lightbox
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

  // Méthode pour afficher les médias du photographe dans la page
  const mediaSection = () => {
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
    counterLikes(); // Mettre à jour le nombre total de likes

    handleClickMediacardImg(media); // Gestionnaire d'événements pour les images de la carte média
  };

  const displayLightbox = (media, mediaCardCurrentElement) => {
    const lightbox = document.querySelector(".lightbox");
    const lightboxClose = document.querySelector(".lightbox__close");
    const lightboxNext = document.querySelector(".lightbox__next");
    const lightboxPrev = document.querySelector(".lightbox__prev");
    const main = document.querySelector("#main");

    const mediaCurrentIndex = media.findIndex(
      (media) => media.id === parseInt(mediaCardCurrentElement.dataset.id)
    );

    lightbox.classList.add("open");
    main.style.display = "none";

    showMedia(mediaCurrentIndex, media);

    lightboxClose.addEventListener("click", () => {
      lightbox.classList.remove("open");
      main.style.display = "block";
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
      }
      if (event.code === "ArrowLeft") {
        handleScrollMedia("prev", media);
      }
      if (event.code === "Escape") {
        lightbox.classList.remove("open");
        main.style.display = "block";
      }
    });
  };
  const handleClickMediacardImg = (media) => {
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
  return {
    bioSection,
    contactForm,
    dropdown,
    mediaSection,
  };
};
