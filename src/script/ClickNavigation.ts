export default class ClickNavigator {
  readonly DEFAULT_AUTO_SLIDE_TIMER = 2;

  private set currentIndex(value: number) {
    if(value > this.arrayOfElement.length - 1) {
      value = 0
    }

    if(this._timer) this.setTimerImageNavigation()

    this._currentIndex = value
    this.setElementStatus()
  }
  private _currentIndex = 0
  private readonly arrayOfElement: HTMLElement[]

  /**
   * @param _parentContainer parent of elements to navigate on click
   * @param _customContainerNavigable class of navigation container
   * @param _timer if true, imageNavigation is automatic with time
   * */
  constructor (
    private _parentContainer: HTMLElement,
    private _customContainerNavigable = "is-navigable",
    private _timer = false
  ) {

    this.arrayOfElement = getDirectChildrenHTMLElements(_parentContainer.childNodes)

    if(this.arrayOfElement.length > 1) {
      _parentContainer.classList.add(_customContainerNavigable)

      if(!_timer) {
        _parentContainer.addEventListener("click", () => {
          this.currentIndex = this._currentIndex + 1
        });
      } else {
        this.setTimerImageNavigation()
      }

      this.setElementStatus()
    }
  }

  private setTimerImageNavigation() {

    const element = this.arrayOfElement[this._currentIndex];

    let timer = parseInt(element.dataset.timer)

    if(isNaN(timer)) timer = this.DEFAULT_AUTO_SLIDE_TIMER

    setTimeout(() => {
      this.currentIndex = this._currentIndex + 1

    }, timer * 1000)
  }

  private setElementStatus() {
    for(let index = 0; index < this.arrayOfElement.length; index++) {
      const element = this.arrayOfElement[index];

      if(index === this._currentIndex) {
        element.classList.add("current")
      } else {
        element.classList.remove("current")
      }
    }
  }
}

function getDirectChildrenHTMLElements(parentElement: NodeListOf<ChildNode>): HTMLElement[] {
  const arrayOfElementToNavigate: HTMLElement[] = []

  for(const i in parentElement) {
    const element = parentElement[i];

    if(element instanceof HTMLElement) {
      arrayOfElementToNavigate.push(element)
    }
  }

  return arrayOfElementToNavigate;
}
