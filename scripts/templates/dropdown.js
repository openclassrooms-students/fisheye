export const dropdown = () => {
  const dropdownWrapper = document.querySelector("#dropdown-wrapper");
  const dropdownLinks = document.querySelectorAll(".dropdown-list a");

  // Sélection de l'élément span où afficher la valeur sélectionnée
  const selectedValueSpan = document.querySelector("#dropdown-title");

  // Gestion de l'événement clic sur le conteneur du dropdown
  dropdownWrapper.addEventListener("click", function () {
    this.classList.toggle("is-active");
  });

  // Gestion de l'événement clic sur chaque lien dans la liste déroulante
  dropdownLinks.forEach((link) => {
    link.addEventListener("click", function (event) {
      // Suppression de la classe "selected" de tous les parents d'éléments li
      dropdownLinks.forEach((item) => {
        item.parentElement.classList.remove("selected");
      });
      // Mise à jour de la valeur affichée dans l'élément span avec le texte du lien cliqué
      selectedValueSpan.innerHTML = event.currentTarget.textContent;
      selectedValueSpan.parentElement.setAttribute(
        "data-sort",
        event.currentTarget.getAttribute("data-sort")
      );

      // Ajout de la classe "selected" au parent de l'élément lien cliqué
      this.parentElement.classList.add("selected");
    });
  });
};
