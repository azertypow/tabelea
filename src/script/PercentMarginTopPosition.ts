export default class PercentMarginTopPosition {
  constructor(private _element: HTMLElement, private _topPercentPosition: number) {
    window.addEventListener("resize", () => {
      this.setMarginTopOfElement()
    })

    this.setMarginTopOfElement()
  }

  public setMarginTopOfElement() {
    this._element.style.marginTop = `${this._element.getBoundingClientRect().height / 100 * this._topPercentPosition}px`
  }
}