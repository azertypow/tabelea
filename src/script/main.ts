import verticalTextScrolling from "@azertypow/vertical-text-scrolling/src/textToScroll"
import ClickNavigator from "./clickNavigation"

addScrollOnHeaderFixedText()
addClickNavigationOnProjectImages()

function addScrollOnHeaderFixedText() {
  const elementToScroll = document.querySelector(".text-to-scroll")
  if(elementToScroll instanceof HTMLElement) {
    verticalTextScrolling(elementToScroll, 15)
  }
}



function addClickNavigationOnProjectImages() {
  const imageSlideContainers = document.querySelectorAll(".l-images-slide")

  for(const i in imageSlideContainers) {
    const element = imageSlideContainers[i]

    if(element instanceof HTMLElement) {
      new ClickNavigator(element)
    }
  }
}
