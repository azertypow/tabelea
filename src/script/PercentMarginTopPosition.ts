export default class PercentMarginTopPosition {
  constructor(private _element: HTMLElement, private _topPercentPosition: number) {
    window.addEventListener("resize", () => {
      this._setMarginTopOfElement()
    })

    this._setMarginTopOfElement()
  }

  private _setMarginTopOfElement() {
    this._element.style.marginTop = `${this._element.getBoundingClientRect().height / 100 * this._topPercentPosition}px`
  }
}