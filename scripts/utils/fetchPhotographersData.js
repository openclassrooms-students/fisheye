//récupere les données JSON des photographes path : data/photographers.json
export const fetchPhotographersData = async () => {
  const response = await fetch("./data/photographers.json");
  const data = await response.json();
  return data;
};
