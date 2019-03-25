export default class {
  constructor() {
    const end = document.querySelector('#page-end') as HTMLElement

    document.addEventListener("scroll", (ev) => {
      if(end.getBoundingClientRect().top < 25) {
        document.body.style.paddingTop = "100vh"
        document.body.scrollTop = document.documentElement.scrollTop = 0
      }
    })
  }
}
