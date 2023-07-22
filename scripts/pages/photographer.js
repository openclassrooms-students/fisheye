import { photographer } from "../templates/photographer.js";

async function main() {
  const photographerInstance = await photographer();

  photographerInstance.bioSection();
  photographerInstance.contactForm();
  photographerInstance.dropdown();
  photographerInstance.mediaSection();
}

main();
