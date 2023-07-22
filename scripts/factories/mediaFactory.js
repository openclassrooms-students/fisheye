const createImageElement = ({ src, alt, title }) => {
  const image = document.createElement("img");
  image.classList.add("card-media__img");
  image.src = src;
  image.alt = alt;
  image.title = title;
  return image;
};

const createVideoElement = ({ src, title }, autoplay = false) => {
  const video = document.createElement("video");
  video.classList.add("card-media__img");
  video.src = src;

  // demarrer la video automatiquement quand autoplay est true
  if (autoplay) {
    video.autoplay = true;
  }

  const pra = document.createElement("p");
  pra.textContent = title;

  video.appendChild(pra);
  return video;
};

export const mediaFactory = (media, autoplay = false) => {
  if (media.type === "img") {
    return createImageElement(media);
  }
  if (media.type === "video") {
    return createVideoElement(media, autoplay);
  }
};
