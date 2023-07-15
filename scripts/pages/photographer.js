//Mettre le code JavaScript lié à la page photographer.html
import { BioPhotographerFactory } from "../factories/BioPhotographerFactory.js";
import { fetchPhotographersData } from "../utils/fetchPhotographersData.js";
import { contact } from "../utils/contactForm.js";
import { dropdown } from "../templates/dropdown.js";

const main = async () => {

    const { photographers } = await fetchPhotographersData();

    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    const photographerUser = photographers.find((photographer) => photographer.id == id)

    const photographer = BioPhotographerFactory(photographers);
     photographer.getBio(photographerUser);

    contact(photographerUser);

    dropdown();
    

}

main();
