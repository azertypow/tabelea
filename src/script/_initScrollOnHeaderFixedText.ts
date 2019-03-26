import verticalTextScrolling from "@azertypow/vertical-text-scrolling/src/textToScroll"

export default function() {
  const elementToScroll = document.querySelector(".text-to-scroll")
  if(elementToScroll instanceof HTMLElement) {
    verticalTextScrolling(elementToScroll, 25)
  }
}
