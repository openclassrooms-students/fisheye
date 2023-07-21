export const contact = (photographer) => {
  const form = document.querySelector(".form-fields");
  const openFormButton = document.querySelector(".photographer-bio__contact");
  const formContainer = document.querySelector(".form-container");
  const formCloseButton = document.querySelector(".form-close");
  const title = document.querySelector("#title");

  openFormButton.addEventListener("click", () => {
  console.log("openFormButton", openFormButton);
    formContainer.classList.add("open");
    title.textContent = `Contactez-moi ${photographer.name}`;
  });

  formCloseButton.addEventListener("click", () => {
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
