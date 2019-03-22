import verticalTextScrolling from "@azertypow/vertical-text-scrolling/src/textToScroll"
import ClickNavigator from "./clickNavigation"

addScrollOnHeaderFixedText()
addClickNavigationOnProjectImages()
addAutomaticTimerImageNavigation()

function addScrollOnHeaderFixedText() {
  const elementToScroll = document.querySelector(".text-to-scroll")
  if(elementToScroll instanceof HTMLElement) {
    verticalTextScrolling(elementToScroll, 15)
  }
}



function addClickNavigationOnProjectImages() {
  const imageSlideContainers = document.querySelectorAll(".l-images-slide:not(.is-auto)")

  for(const i in imageSlideContainers) {
    const element = imageSlideContainers[i]

    if(element instanceof HTMLElement) {
      new ClickNavigator(element)
    }
  }
}

function addAutomaticTimerImageNavigation() {
  const imageTimerContainers = document.querySelectorAll(".l-images-slide.is-auto")

  console.log(imageTimerContainers)

  for(const i in imageTimerContainers) {
    const element = imageTimerContainers[i]

    if(element instanceof HTMLElement) {
      new ClickNavigator(element, "is-navigable", true)
    }
  }
}