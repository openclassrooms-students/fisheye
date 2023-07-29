import { sortUserMedia } from "../utils/filterUserData.js";
import heartSvg from "./heartSvg.js";

const counterLikes = (data, currentSort) => {
  const { user, media } = sortUserMedia(data, currentSort);
  let countLikes = 0;
  const { price } = user;

  media.forEach((media) => {
    countLikes += media.likes;
  });

  const totalLikesContainer = document.querySelector(".total-likes-container");

  totalLikesContainer.innerHTML = `
      <div class="total-likes">
        <span id="total-likes__number">${countLikes}</span>
        ${heartSvg}
      </div>
      <p class="price">${price}€ / jour</p>
    `;
};

export default counterLikes;
