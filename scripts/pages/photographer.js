import { mediaFactory } from "../factories/MediaFactory.js";

async function main() {
  const mediaFactoryInstance = await mediaFactory();

  mediaFactoryInstance.bioSection();
  mediaFactoryInstance.contactForm();
  mediaFactoryInstance.dropdown();
  mediaFactoryInstance.mediaSection();
}

main();
