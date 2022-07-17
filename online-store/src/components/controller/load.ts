import Controller from "./controller";

class Load extends Controller {
  constructor() {
    super()
  }
  load() {
    this.sort(this.data)
    this.filter()
    this.select.addEventListener('change', () => {
      const catalog = document.querySelector('.catalog') as HTMLElement
      catalog.innerHTML = ''

      this.sort(this.dataFiltered)
    })
  }
}

export default Load