import mediaSection from "./mediaSection.js";

// gérer le menu déroulant de tri des médias
const dropdown = (data, currentSort) => {
  const dropdownWrapper = document.querySelector("#dropdown-wrapper");
  const dropdownLinks = document.querySelectorAll(".dropdown-list button");
  const dropdownList = document.querySelector(".dropdown-list");
  const selectedValueSpan = document.querySelector("#dropdown-title");

  const displayDropdown = () => {
    dropdownWrapper.classList.toggle("is-active");
    const expanded = dropdownWrapper.classList.contains("is-active");
    dropdownWrapper.setAttribute("aria-expanded", expanded);
    dropdownList.setAttribute("aria-hidden", !expanded);
    // mettre à jour l'attribut tabindex des buttons dans la liste déroulante
    dropdownLinks.forEach((link) => {
      link.tabIndex = expanded ? 0 : -1;
    });
  };

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
        const button = selectedValueSpan.parentElement;
        button.setAttribute("data-sort", currentSort);
        button.setAttribute("aria-activedescendant", link.id);
      // Ajout de la classe "selected" au parent de l'élément lien cliqué
        this.parentElement.classList.add("selected");
        this.setAttribute("aria-selected", true);
      // dropdownButton.focus();

      // Mettez simplement à jour le contenu de la section media existante
      mediaSection(data, currentSort);
    });
  });
};

export default dropdown;
