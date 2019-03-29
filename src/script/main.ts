import initClickNavigationOnProjectImages from "./_initClickNavigationOnProjectImages"
import initAutomaticTimerImageNavigation from "./_initAutomaticTimerImageNavigation"
import initDescriptionToHeaderSystem from "./_initDescriptionToHeaderSystem"
import initCardDraggabilly from "./_initCardDraggabilly"
import initOpenCloseContact from "./_initOpenCloseContact"
import PercentMarginTopPosition from "./PercentMarginTopPosition"

initClickNavigationOnProjectImages()
initAutomaticTimerImageNavigation()
initDescriptionToHeaderSystem()
initCardDraggabilly()
initOpenCloseContact()

const nodeListOfElementWithPercentPosition = document.querySelectorAll("[data-top]")

for(const i in nodeListOfElementWithPercentPosition) {
  const elementWithPercentPosition = nodeListOfElementWithPercentPosition[i]

  if(elementWithPercentPosition instanceof HTMLElement) {
    const topPosition = parseFloat(elementWithPercentPosition.dataset.top)

    if(typeof topPosition === "number" && !isNaN(topPosition)) {
      const percentMarginTopPosition = new PercentMarginTopPosition(elementWithPercentPosition, topPosition)
      const nodeListOfImagesInPercentMarginTopPosition = elementWithPercentPosition.querySelectorAll("img")

      nodeListOfImagesInPercentMarginTopPosition.forEach((imageElement) => {
        imageElement.addEventListener("load", () => {
          percentMarginTopPosition.setMarginTopOfElement()
        })
      })
    }
  }
}
