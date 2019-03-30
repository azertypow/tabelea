import FileInformation from "./FileInformation"

export default class ImageLoader {

  image = this._imageContainer.querySelector("img")

  largeImgElement = document.createElement("img")


  imageInfo = new FileInformation(this.image.src)

  constructor(private _imageContainer: HTMLDivElement, onSmallImgLoaded: (_this: ImageLoader) => void) {
    if(this.image instanceof HTMLImageElement) {

      const imgElementForLoadedEvent = document.createElement("img")
      imgElementForLoadedEvent.addEventListener("load", () => {
        onSmallImgLoaded(this)
      })

      imgElementForLoadedEvent.src = this.image.src

      this.largeImgElement.addEventListener("load", () => {
        console.log("large image loaded")
        this.largeImgElement.style.opacity = "1"
      })

      this.largeImgElement.draggable = false
      this.largeImgElement.className = "im-large-img"
    }
  }

  public loadLargeImage() {
    this.largeImgElement.src = `${this.imageInfo.fileNameWithoutSizeInfo}.${this.imageInfo.extension}`
    this._imageContainer.appendChild(this.largeImgElement)
  }
}
