import initScrollOnHeaderFixedText from "./_initScrollOnHeaderFixedText"
import initClickNavigationOnProjectImages from "./_initClickNavigationOnProjectImages"
import initAutomaticTimerImageNavigation from "./_initAutomaticTimerImageNavigation"
import initDescriptionToHeaderSystem from "./_initDescriptionToHeaderSystem"
import initCardDraggabilly from "./_initCardDraggabilly"
import initLoopScrolling from "./_initLoopScrolling"
import initOpenCloseContact from "./_initOpenCloseContact"
import PercentMarginTopPosition from "./PercentMarginTopPosition"

initScrollOnHeaderFixedText()
initClickNavigationOnProjectImages()
initAutomaticTimerImageNavigation()
initDescriptionToHeaderSystem()
initCardDraggabilly()
initLoopScrolling()
initOpenCloseContact()

const nodeListOfElementWithPercentPosition = document.querySelectorAll("[data-top]")

for(const i in nodeListOfElementWithPercentPosition) {
  const elementWithPercentPosition = nodeListOfElementWithPercentPosition[i]

  if(elementWithPercentPosition instanceof HTMLElement) {
    const topPosition = parseFloat(elementWithPercentPosition.dataset.top)

    if(typeof topPosition === "number" && !isNaN(topPosition)) {
      new PercentMarginTopPosition(elementWithPercentPosition, topPosition)
    }
  }
}
