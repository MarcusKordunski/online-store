import Controller from "./controller";

class Load extends Controller {
  constructor() {
    super()
  }
  load() {
    this.sort()
    this.select.addEventListener('change', () => {
      const catalog = document.querySelector('.catalog') as HTMLElement
      catalog.innerHTML = ''
      this.sort()
    })
  }
}

export default Load