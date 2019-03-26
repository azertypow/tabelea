import OpenCloseElement from "./OpenCloseElement"

export default function() {
  const elementToOpenClose = document.querySelector(".to-open-close")
  const elementToggleClose = document.querySelector(".is-open-toggle")

  if(elementToOpenClose instanceof HTMLElement && elementToggleClose instanceof HTMLElement) new OpenCloseElement(elementToOpenClose, elementToggleClose)
}
