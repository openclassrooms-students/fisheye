import { contactFormFactory } from "../factories/contactFormFactory";

const contactForm = (photographerName) => {
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

  // Fonction pour empêcher le défilement de la page lorsque le formulaire est ouvert
  const disableScroll = (event) => {
    event.preventDefault();
  };

  const handleDisplayForm = () => {
    formContainer.classList.add("open");
    formContainer.ariaHidden = "false";
    formWrapper.ariaLabelledby = `Contact me ${photographerName}`;
    title.textContent = `Contactez-moi ${photographerName}`;
    document.addEventListener("wheel", disableScroll, { passive: false });
    document.addEventListener("keydown", handleTabKey);
  };

  const handleClosingForm = () => {
    formContainer.classList.remove("open");
    form.reset();
    document.removeEventListener("wheel", disableScroll);
    document.removeEventListener("keydown", handleTabKey);
  };

  // Gestion des événements clic
  openFormButton.addEventListener("click", handleDisplayForm);
  formCloseButton.addEventListener("click", handleClosingForm);

  // Gestion des événements clavier
  formContainer.addEventListener("keydown", (event) => {
    if (event.code === "Escape") {
      formContainer.classList.remove("open");
      form.reset();
    }
  });

  // Gestion des événements de saisie
  form.addEventListener("input", (e) => {
    const id = e.target.id;
    contactFormFactory(id, messageInputError[id]);
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Les valeurs des inputs du formulaire
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

export default contactForm;
