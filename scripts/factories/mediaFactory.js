const createImageElement = ({ id, src, title }, ariaLabel) => {
  const image = document.createElement("img");
  image.classList.add("card-media__media");
  image.src = src;
  image.alt = title;
  image.loading = "lazy";
  image.ariaLabel = ariaLabel;
  image.dataset.id = id;

  return image;
};

const createVideoElement = (
  { id, src, title },
  autoplay = false,
  ariaLabel
) => {
  const video = document.createElement("video");
  video.classList.add("card-media__media");
  video.src = src;
  video.loading = "lazy";
  video.ariaLabel = ariaLabel;
  video.dataset.id = id;

  const source = document.createElement("source");
  source.src = src;
  source.type = "video/mp4";
  video.appendChild(source);

  // demarrer la video automatiquement quand autoplay est true
  if (autoplay) {
    video.autoplay = true;
  }

  const pra = document.createElement("p");
  pra.textContent = title;

  video.appendChild(pra);
  return video;
};

export const mediaFactory = (
  media,
  autoplay = false,
  ariaLabel = "Lilac breasted roller, closeup view"
) => {
  if (media.type === "img") {
    return createImageElement(media, ariaLabel);
  }
  if (media.type === "video") {
    return createVideoElement(media, autoplay, ariaLabel);
  }
};
