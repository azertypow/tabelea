import ClickNavigator from "./ClickNavigation"

export default function() {
  const imageTimerContainers = document.querySelectorAll(".l-images-slide.is-auto")
  for(const i in imageTimerContainers) {
    const element = imageTimerContainers[i]

    if(element instanceof HTMLElement) {
      new ClickNavigator(element, "is-navigable", true)
    }
  }
}
