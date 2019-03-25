import initScrollOnHeaderFixedText from "./initScrollOnHeaderFixedText"
import initClickNavigationOnProjectImages from "./initClickNavigationOnProjectImages"
import initAutomaticTimerImageNavigation from "./initAutomaticTimerImageNavigation"
import initDescriptionToHeaderSystem from "./initDescriptionToHeaderSystem"
import initCardDraggabilly from "./initCardDraggabilly"
import initLoopScrolling from "./initLoopScrolling"
import initOpenCloseContact from "./initOpenCloseContact"
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
