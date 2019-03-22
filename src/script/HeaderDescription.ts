export default class HeaderDescription {
  private readonly _DESCRIPTION_ELEMENT_QUERY_SELECTOR = ".l-images-container__description"

  private _descriptionElement: HTMLElement | null = null

  constructor(private readonly _descriptionContainer: HTMLElement, private readonly _elementToPutDescription) {
    const descriptionElement = _descriptionContainer.querySelector(this._DESCRIPTION_ELEMENT_QUERY_SELECTOR)

    if(descriptionElement instanceof HTMLElement) {
      this._descriptionElement = descriptionElement

      this.setThisDescriptionPutToElementEvent();
    }
  }

  private setThisDescriptionPutToElementEvent() {

    console.log("description element: ", this._descriptionContainer)
    console.log("element where put desc: ", this._elementToPutDescription)

    this._descriptionContainer.addEventListener("mouseenter", () => {

      console.log("enter")

      this._elementToPutDescription.innerHTML = this._descriptionElement.innerHTML
    })
  }
}