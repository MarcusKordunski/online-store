import { data } from "../data/data";
import { IData } from "../types/types";
import Cards from "../view/cards/cards";

class Controller {
  cards: Cards
  data: IData[]
  select: HTMLSelectElement
  value: string
  dataFiltered: IData[]
  constructor() {
    this.cards = new Cards()
    this.data = data
    this.select = document.querySelector('.sort') as HTMLSelectElement
    this.value = this.select.value
    this.dataFiltered = data
  }
  sort(data: IData[]) {
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
  filter() {
    const filterForm = document.querySelector('.filter-form') as HTMLElement
    let filters: string[] = []
    let dataFiltered: IData[] = data
    filterForm.addEventListener('change', (e) => {
      const el = e.target as HTMLInputElement;
      if (el !== null && el.tagName === 'INPUT' && el.id !== 'search') {
        if (!filters.includes(el.id) && !el.dataset.filter) {
          filters.push(el.id)
        } else {
          filters = filters.filter(item => item !== el.id)
        }

        if (el.dataset.filter) {
          if (!filters.includes(el.dataset.filter)) {
            filters.push(el.dataset.filter)
          } else {
            filters = filters.filter(item => item !== el.dataset.filter)
          }
        }
        console.log(filters)

        dataFiltered = data.filter(item => {
          let counter = 0
          for (const key in item) {
            for (const j of filters) {
              if (key !== 'favorite' && key !== 'quantity' && key !== 'year' && key !== 'num' && key !== 'img') {
                console.log(key + ' ' + j)
                if (String(item[key as keyof typeof item]).toLowerCase() == j) {
                  counter++
                  if (counter === filters.length) {
                    return item
                  }
                }
              }
              console.log(counter)
            }
          }
        })

        const catalog = document.querySelector('.catalog') as HTMLElement
        catalog.innerHTML = ''
        if (filters.length === 0) {
          this.cards.draw(data)
          dataFiltered = data
          this.dataFiltered = data
        } else {
          console.log(dataFiltered)
          this.cards.draw(dataFiltered)
          this.dataFiltered = dataFiltered
        }
      }
    })
  }
}

export default Controller