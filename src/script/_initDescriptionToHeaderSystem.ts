import HeaderDescription from "./HeaderDescription"
import verticalTextScrolling from "@azertypow/vertical-text-scrolling/src/textToScroll"

export default function() {
  let currentHTMLInElementToScroll = ""

  const headerForDescription = document.querySelector(".l-site-header__text")

  const nodeListOfImageContainer = document.querySelectorAll(".l-images-container")

  const elementToScrollContainer = document.querySelector(".text-to-scroll")

  if(elementToScrollContainer instanceof HTMLElement) {
    for(const i in nodeListOfImageContainer) {
      const imageContainer = nodeListOfImageContainer[i]

      if(imageContainer instanceof HTMLElement) {
        new HeaderDescription(imageContainer, headerForDescription, function(_this) {

          if(currentHTMLInElementToScroll !== _this.HTMLDescription) {

            currentHTMLInElementToScroll = _this.HTMLDescription

            const elementToScroll = document.createElement("div")

            elementToScroll.innerHTML = _this.HTMLDescription

            clearChildOfHTMLElement(elementToScrollContainer).appendChild(elementToScroll)

            verticalTextScrolling(elementToScroll, 25, true)
          }
        })
      }
    }
  }
}

function clearChildOfHTMLElement(elementToClear: HTMLElement) {
    let firstChildOfContainer: ChildNode | null = elementToClear.firstChild
    while(firstChildOfContainer) {
      elementToClear.removeChild(firstChildOfContainer)
      firstChildOfContainer = elementToClear.firstChild
    }
    return elementToClear
}