export const BioPhotographerFactory = (photographer) => {



    const getBio = (photographer) => {
        const main = document.querySelector("#main");

        console.log("photographer", photographer);
        const { name, city, country, tagline, portrait } = photographer;

        const wrapper = document.createElement("section");
        wrapper.classList.add("bio-photographer");

        wrapper.innerHTML = `
        <div class="photographer-bio__info">
            <h1 class="photographer-bio__info__name">${name}</h1>
            <p class="photographer-bio__info__location">${city}, ${country}</p>
            <p class="photographer-bio__info__tagline">${tagline}</p>
        </div>
        <button class="photographer-bio__contact" aria-label="Contact Me" tabindex="-1">Contactez-moi</button>
        <img class="photographer-card__img" src="assets/photographers/photos/${portrait}" alt="photo de ${name}">
        `;

        main.appendChild(wrapper);

        return wrapper;
    };

    return {
        getBio,

    }


};
