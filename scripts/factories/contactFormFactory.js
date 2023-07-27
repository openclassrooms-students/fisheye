// Fonction pour vérifier si une chaîne de caractères a une longueur supérieure ou égale à une valeur minimale
const isLengthValid = (str, min) => {
  return str.length >= min;
};

// Fonction pour afficher les messages d'erreur et les bordures des champs
const displayError = (input, errorMessage) => {
  input.classList.add("input-error-border");
  const small = input.parentElement.querySelector("small");
  small.textContent = errorMessage;
  small.classList.add("input-error");
};

// Fonction pour supprimer les messages d'erreur et les bordures des champs
const clearError = (input) => {
  input.classList.remove("input-error-border");
  const small = input.parentElement.querySelector("small");
  small.textContent = "";
  small.classList.remove("input-error");
};

// Expression régulière pour la validation de l'email
const isEmailValid = (email) => {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

export const contactFormFactory = (idInput, messageInputError) => {
  const input = document.getElementById(idInput);
  const name = input.value.trim();

  switch (idInput) {
      case "firstName":
      if (!isLengthValid(name, messageInputError.min)) {
        displayError(input, messageInputError.msg);
        return false;
      }
      break;
    case "lastName":
      if (!isLengthValid(name, messageInputError.min)) {
        displayError(input, messageInputError.msg);
        return false;
      }
      break;
    case "email":
      if (!isEmailValid(name)) {
        displayError(input, messageInputError.msg);
        return false;
      }
      break;
    case "message":
      if (!isLengthValid(name, messageInputError.min)) {
        displayError(input, messageInputError.msg);
        return false;
      }
      break;
    default:
      break;
  }

  clearError(input);
  return true;
};
