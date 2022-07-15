import { data } from "../data/data";
import { IData } from "../types/types";
import Cards from "../view/cards/cards";

class Controller {
  cards: Cards
  data: IData[]
  select: HTMLSelectElement
  value: string
  constructor() {
    this.cards = new Cards()
    this.data = data
    this.select = document.querySelector('.sort') as HTMLSelectElement
    this.value = this.select.value
  }
  sort() {
    this.value = this.select.value
    console.log(this.value)
    if (this.value === 'nameAsc') {
      const dataSorted: IData[] = data.sort(function (a, b) {
        if (a.name > b.name) {
          return 1;
        }
        if (a.name < b.name) {
          return -1;
        }
        return 0
      })
      this.cards.draw(dataSorted)

    } else if (this.value === 'nameDesc') {
      const dataSorted: IData[] = data.sort(function (a, b) {
        if (a.name < b.name) {
          return 1;
        }
        if (a.name > b.name) {
          return -1;
        }
        return 0
      })
      this.cards.draw(dataSorted)

    } else if (this.value === 'yearAsc') {
      const dataSorted: IData[] = data.sort(function (a, b) {
        if (Number(a.year) > Number(b.year)) {
          return 1;
        }
        if (Number(a.year) < Number(b.year)) {
          return -1;
        }
        return 0
      })
      this.cards.draw(dataSorted)

    } else if (this.value === 'yearDesc') {
      const dataSorted: IData[] = data.sort(function (a, b) {
        if (Number(a.year) < Number(b.year)) {
          return 1;
        }
        if (Number(a.year) > Number(b.year)) {
          return -1;
        }
        return 0
      })
      this.cards.draw(dataSorted)
    }
  }
}

export default Controller