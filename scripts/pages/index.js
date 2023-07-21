import { fetchPhotographersData } from "../utils/fetchPhotographersData.js";
import { thumbPhotographerFactory } from "../factories/thumbPhotographerFactory.js";


const main = async () => {
    // Récupère les datas des photographes
    const {photographers} = await fetchPhotographersData();
    // Crée le wrapper des photographes
    const thumbPhotographer = thumbPhotographerFactory(photographers);
    const wrapper = thumbPhotographer.getWrapper(photographers);

    // Ajoute le wrapper au DOM
    const main = document.querySelector("#main");
    main.appendChild(wrapper);
};



main();



