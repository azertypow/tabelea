import verticalTextScrolling from "@azertypow/vertical-text-scrolling/src/textToScroll"
import ClickNavigator from "./clickNavigation"
import HeaderDescription from "./HeaderDescription"
import * as draggabilly from "draggabilly"
import OpenCloseElement from "./OpenCloseElement"

const Draggabilly = draggabilly.default

addScrollOnHeaderFixedText()
addClickNavigationOnProjectImages()
addAutomaticTimerImageNavigation()
addDescriptionToHeaderSystem()
addCardDraggabilly()

const elementToOpenClose = document.querySelector(".to-open-close")
const elementToggleClose = document.querySelector(".is-open-toggle")

if(elementToOpenClose instanceof HTMLElement && elementToggleClose instanceof HTMLElement) new OpenCloseElement(elementToOpenClose, elementToggleClose)

function addScrollOnHeaderFixedText() {
  const elementToScroll = document.querySelector(".text-to-scroll")
  if(elementToScroll instanceof HTMLElement) {
    verticalTextScrolling(elementToScroll, 25)
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

function addDescriptionToHeaderSystem() {
  const headerForDescription = document.querySelector(".l-site-header__text")

  const nodeListOfImageContainer = document.querySelectorAll(".l-images-container")

  for(const i in nodeListOfImageContainer) {
    const imageContainer = nodeListOfImageContainer[i]

    if(imageContainer instanceof HTMLElement) {
      new HeaderDescription(imageContainer, headerForDescription)
    }
  }
}

function addCardDraggabilly() {
  new Draggabilly(".l-draggable")
}

