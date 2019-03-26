import ClickNavigator from "./ClickNavigation"

export default function() {
  const imageSlideContainers = document.querySelectorAll(".l-images-slide:not(.is-auto)")

  for(const i in imageSlideContainers) {
    const element = imageSlideContainers[i]

    if(element instanceof HTMLElement) {
      new ClickNavigator(element)
    }
  }
}
