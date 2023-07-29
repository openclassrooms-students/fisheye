import bioSection from "../templates/bioSection.js";
import contactForm from "../templates/contactForm.js";
import counterLikes from "../templates/counterLikes.js";
import dropdown from "../templates/dropdown.js";
import mediaSection from "../templates/mediaSection.js";
import { fetchPhotographersData } from "../utils/fetchPhotographersData.js";

async function main() {
  let data = {};
  let currentSort = "popularity";

  //  Récupère les données du photographe
  try {
    data = await fetchPhotographersData(); // Attendez que les données soient récupérées avant de continuer
  } catch (error) {
    console.error(error);
  }

  const { photographers } = data;

  bioSection(photographers);
  contactForm(photographers);
  dropdown(data, currentSort);
  mediaSection(data, currentSort);
  counterLikes(data, currentSort);
}

main();
