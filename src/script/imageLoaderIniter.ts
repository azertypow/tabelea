import ImageLoader from "./ImageLoader"

export default function () {
  const nodeListOfImageContainer = document.querySelectorAll(".im-image-loader")

  let imageLoadedCounter = 0

  const arrayOfImageLoader: ImageLoader[] = []

  nodeListOfImageContainer.forEach((imageContainer) => {
    if(imageContainer instanceof HTMLDivElement) {
      arrayOfImageLoader.push(
        new ImageLoader(imageContainer, _this => {
          imageLoadedCounter++

          if(imageLoadedCounter === nodeListOfImageContainer.length) {
            allSmallImagesLoaded(arrayOfImageLoader)
          }
        })
      )
    } else {
      console.info("image container must be a div HTMLElement: ", imageContainer)
    }
  })
}

function allSmallImagesLoaded(arrayOfImageLoader: ImageLoader[]) {
  for(const imageLoader of arrayOfImageLoader) {
    imageLoader.loadLargeImage()
  }
}