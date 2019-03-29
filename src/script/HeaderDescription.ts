import verticalTextScrolling from "@azertypow/vertical-text-scrolling/src/textToScroll"

export default class HeaderDescription {
  private readonly _DESCRIPTION_ELEMENT_QUERY_SELECTOR = ".l-images-container__description"

  private _descriptionElement: HTMLElement | null = null

  constructor(private readonly _descriptionContainer: HTMLElement, private readonly _elementToPutDescription, private _onMouseEnter?: (_this: HeaderDescription)=>any) {
    const descriptionElement = _descriptionContainer.querySelector(this._DESCRIPTION_ELEMENT_QUERY_SELECTOR)

    if(descriptionElement instanceof HTMLElement) {
      this._descriptionElement = descriptionElement

      this.setThisDescriptionPutToElementEvent();
    }
  }

  public get HTMLDescription() {
    return this._descriptionElement.innerHTML
  }

  private setThisDescriptionPutToElementEvent() {
    this._descriptionContainer.addEventListener("mouseenter", () => {
      this._onMouseEnter(this)
    })
  }
}