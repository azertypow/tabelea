export default class OpenCloseElement {

  set _open(value: boolean) {
    // @ts-ignore: force write value
    this.__open = value
    this._elementToOpenClose.dataset.open = value.toString()
  }
  private readonly __open = false

  constructor(
    private _elementToOpenClose: HTMLElement,
    private _elementForOpen: HTMLElement,
    private _elementForClosed = _elementForOpen) {

    if(_elementForClosed === _elementForOpen) {
      _elementForOpen.addEventListener("click", this._setEventToggle_open.bind(this))
    } else {

    }
  }

  private _setEventToggle_open() {
    this._open = !this.__open
  }
  private _setEventOpen_open() {}
  private _setEventClose_open() {}
}