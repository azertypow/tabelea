export default class ClickNavigator {
  private set currentIndex(value: number) {
    console.log(this._currentIndex)

    if(value > this.arrayOfElement.length - 1) {
      value = 0
    }

    this._currentIndex = value
    this.setElementStatus()
  }
  private _currentIndex = 0
  private readonly arrayOfElement: HTMLElement[]

  /**
   * @param _parentContainer parent of elements to navigate on click
   * @param _customContainerNavigable class of navigation container
   * */
  constructor (
    private _parentContainer: HTMLElement,
    private _customContainerNavigable = "is-navigable"
  ) {

    this.arrayOfElement = getDirectChildrenHTMLElements(_parentContainer.childNodes)

    if(this.arrayOfElement.length > 1) {
      _parentContainer.classList.add(_customContainerNavigable)

      _parentContainer.addEventListener("click", () => {

        this.currentIndex = this._currentIndex + 1
      });

      this.setElementStatus()
    }
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
