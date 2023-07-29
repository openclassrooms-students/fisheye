export const userId = new URLSearchParams(window.location.search).get("id");

export const filterUser = (photographers) => {
  return photographers.find((photographer) => photographer.id == userId);
};

export const sortUserMedia = (
  { media, photographers },
  sort = "popularity"
) => {
  const user = photographers.find((photographer) => photographer.id == userId);
  const mediafilter = media.filter((media) => media.photographerId == userId);

  const userMedia = mediafilter.map((element) => {
    const { id, title, likes, image, video, date } = element;

    const firstName = user.name.split(" ")[0];

    const src = image
      ? `./assets/photographers/${firstName}/${image}`
      : `./assets/photographers/${firstName}/${video}`;

    const type = image ? "img" : "video";

    return {
      id,
      title,
      likes,
      type,
      src,
      date,
    };
  });

  switch (sort) {
    case "date":
      userMedia.sort((a, b) => new Date(a.date) - new Date(b.date));
      break;
    case "title":
      userMedia.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case "popularity":
      userMedia.sort((a, b) => b.likes - a.likes);
      break;
    default:
      break;
  }

  return { user, media: userMedia };
};
