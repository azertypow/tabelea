export default class ClickNavigator {
  readonly DEFAULT_AUTO_SLIDE_TIMER = 2;

  private set currentIndex(value: number) {
    if(value > this.arrayOfElement.length - 1) {
      value = 0
    } else if(value < 0) {
      value = this.arrayOfElement.length - 1
    }

    if(this._timer) this.setTimerImageNavigation()

    this._currentIndex = value
    this.setElementStatus()
  }
  private _currentIndex = 0
  private readonly arrayOfElement: HTMLElement[]

  /**
   * @param _parentContainer parent of elements to navigate on click
   * @param _customContainerNavigableClassname class of navigation container
   * @param _timer if true, imageNavigation is automatic with time
   * */
  constructor (
    private _parentContainer: HTMLElement,
    private _customContainerNavigableClassname = "is-navigable",
    private _timer = false
  ) {

    this.arrayOfElement = getDirectChildrenHTMLElements(_parentContainer.childNodes)

    if(this.arrayOfElement.length > 1) {

      _parentContainer.classList.add(_customContainerNavigableClassname)

      if(!_timer) {
        const leftAndRightElements = ClickNavigator.createLeftRightNavigationElements(_parentContainer, _customContainerNavigableClassname)

        leftAndRightElements.left.addEventListener( "click", () => {this.currentIndex = this._currentIndex - 1})
        leftAndRightElements.right.addEventListener("click", () => {this.currentIndex = this._currentIndex + 1})

        // _parentContainer.addEventListener("click", () => {
        //   this.currentIndex = this._currentIndex + 1
        // });
      } else {
        this.setTimerImageNavigation()
      }

      this.setElementStatus()
    }
  }

  private static createLeftRightNavigationElements(parentContainer: HTMLElement, customContainerNavigableClassname: string): {left: HTMLElement, right: HTMLElement} {
    const leftElement = document.createElement("div")
    const rightElement = document.createElement("div")

    leftElement.className = "l-left"
    rightElement.className = "l-right"

    setClickNavigationElements(leftElement, rightElement, parentContainer)

    parentContainer.appendChild(leftElement)
    parentContainer.appendChild(rightElement)

    return {
      left: leftElement,
      right: rightElement,
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

function setClickNavigationElements(leftElement: HTMLElement, rightElement: HTMLElement, container: HTMLElement) {
  const cStyle = container.style

  cStyle.position = "relative"

  const lStyl = leftElement.style

  lStyl.width = "50%"
  lStyl.height = "100%"
  lStyl.position = "absolute"
  lStyl.top = "0"
  lStyl.left = "0"

  const rStl = rightElement.style

  rStl.width = "50%"
  rStl.height = "100%"
  rStl.position = "absolute"
  rStl.top = "0"
  rStl.right = "0"
}