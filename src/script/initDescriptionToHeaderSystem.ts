import HeaderDescription from "./HeaderDescription"

export default function() {
  const headerForDescription = document.querySelector(".l-site-header__text")

  const nodeListOfImageContainer = document.querySelectorAll(".l-images-container")

  for(const i in nodeListOfImageContainer) {
    const imageContainer = nodeListOfImageContainer[i]

    if(imageContainer instanceof HTMLElement) {
      new HeaderDescription(imageContainer, headerForDescription)
    }
  }
}
