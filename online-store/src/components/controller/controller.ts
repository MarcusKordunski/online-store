import { data } from "../data/data";
import { IData } from "../types/types";
import Cards from "../view/cards/cards";
import * as noUiSlider from 'nouislider';

class Controller {
  cards: Cards
  data: IData[]
  select: HTMLSelectElement
  value: string
  dataFiltered: IData[]
  search: HTMLInputElement
  filterForm: HTMLElement
  dataSliderYear: IData[]
  dataSliderInstock: IData[]
  filters: string[]
  dataInCart: IData[]
  constructor() {
    this.cards = new Cards()
    this.data = data
    this.select = document.querySelector('.sort') as HTMLSelectElement
    this.value = this.select.value
    this.dataFiltered = data
    this.search = document.getElementById('search') as HTMLInputElement
    this.filterForm = document.querySelector('.filter-form') as HTMLInputElement
    this.dataSliderYear = data
    this.dataSliderInstock = data
    this.filters = []
    this.dataInCart = []
  }

  find(data: IData[]) {
    const search = this.search
    const dataSearched: IData[] = data.filter(function (item) {
      return item.name.toLowerCase().indexOf(search.value.toLowerCase()) > -1;
    })

    const catalog = document.querySelector('.catalog') as HTMLElement
    catalog.innerHTML = ''
    this.cards.draw(dataSearched)
  }

  sliderFilter() {
    const sliderYear = document.getElementById('sliderYear') as noUiSlider.target
    const sliderInstock = document.getElementById('sliderInstock') as noUiSlider.target
    if (sliderYear.noUiSlider !== undefined && sliderInstock.noUiSlider !== undefined) {
      sliderYear.noUiSlider.on('update', () => {
        if (sliderYear.noUiSlider !== undefined && sliderInstock.noUiSlider !== undefined) {
          const handlesArr = sliderYear.noUiSlider.get() as number[]
          const handlesArr2 = sliderInstock.noUiSlider.get() as number[]

          if (handlesArr2[0] !== 1 || handlesArr2[1] !== 12) {

            this.dataSliderYear = this.dataSliderInstock.filter(function (item) {
              if (Number(item.year) >= Number(handlesArr[0]) && Number(item.year) <= Number(handlesArr[1])) {
                return item
              }
            })

            const catalog = document.querySelector('.catalog') as HTMLElement
            catalog.innerHTML = ''
            this.cards.draw(this.dataSliderYear)

          } else {

            this.dataSliderYear = this.data.filter(function (item) {
              if (Number(item.year) >= Number(handlesArr[0]) && Number(item.year) <= Number(handlesArr[1])) {
                return item
              }
            })

            const catalog = document.querySelector('.catalog') as HTMLElement
            catalog.innerHTML = ''
            this.cards.draw(this.dataSliderYear)
            this.dataSliderInstock = this.data

          }
        }
      })

      sliderInstock.noUiSlider.on('update', () => {
        if (sliderInstock.noUiSlider !== undefined && sliderYear.noUiSlider !== undefined) {
          const handlesArr = sliderInstock.noUiSlider.get() as number[]
          const handlesArr2 = sliderYear.noUiSlider.get() as number[]

          if (handlesArr2[0] !== 2000 || handlesArr2[1] !== 2022) {
            this.dataSliderInstock = this.dataSliderYear.filter(function (item) {
              if (Number(item.quantity) >= Number(handlesArr[0]) && Number(item.quantity) <= Number(handlesArr[1])) {
                return item
              }
            })

            const catalog = document.querySelector('.catalog') as HTMLElement
            catalog.innerHTML = ''
            this.cards.draw(this.dataSliderInstock)

          } else {

            this.dataSliderInstock = this.data.filter(function (item) {
              if (Number(item.quantity) >= Number(handlesArr[0]) && Number(item.quantity) <= Number(handlesArr[1])) {
                return item
              }
            })

            const catalog = document.querySelector('.catalog') as HTMLElement
            catalog.innerHTML = ''
            this.cards.draw(this.dataSliderInstock)
            this.dataSliderYear = this.data
          }
        }
      })
    }
  }

  sort(data: IData[]) {
    this.value = this.select.value

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
    let dataFiltered: IData[] = data
    this.filterForm.addEventListener('change', (e) => {
      const el = e.target as HTMLInputElement;
      if (el !== null && el.tagName === 'INPUT' && el.id !== 'search') {
        if (!this.filters.includes(el.id) && !el.dataset.filter) {
          this.filters.push(el.id)
        } else {
          this.filters = this.filters.filter(item => item !== el.id)
        }

        if (el.dataset.filter) {
          if (!this.filters.includes(el.dataset.filter)) {
            this.filters.push(el.dataset.filter)
          } else {
            this.filters = this.filters.filter(item => item !== el.dataset.filter)
          }
        }


        let filterCompanyFlag = false
        let filterColorFlag = false
        let filterCamFlag = false
        let counterFilter1 = 0
        let counterFilter2 = 0
        let counterFilter3 = 0

        for (let i = 0; i < this.filters.length; i++) {
          if (this.filters[i] === 'apple' || this.filters[i] === 'samsung' || this.filters[i] === 'xiaomi') {
            counterFilter1++
            if (counterFilter1 >= 2) {
              filterCompanyFlag = true
            } else {
              filterCompanyFlag = false
            }
          }
        }

        for (let i = 0; i < this.filters.length; i++) {
          if (this.filters[i] === 'red' || this.filters[i] === 'white' || this.filters[i] === 'yellow') {
            counterFilter2++
            if (counterFilter2 >= 2) {
              filterColorFlag = true
            } else {
              filterColorFlag = false
            }
          }
        }

        for (let i = 0; i < this.filters.length; i++) {
          if (this.filters[i] === '1' || this.filters[i] === '2' || this.filters[i] === '3') {
            counterFilter3++
            if (counterFilter3 >= 2) {
              filterCamFlag = true
            } else {
              filterCamFlag = false
            }
          }
        }

        dataFiltered = data.filter(item => {
          let counter = 0
          if (filterCompanyFlag === true || filterColorFlag === true || filterCamFlag === true) {
            counter++
          }
          if ((filterCompanyFlag === true && filterColorFlag === true) || (filterCompanyFlag === true && filterCamFlag === true) || (filterCamFlag === true && filterColorFlag === true)) {
            counter++
          }
          if (counterFilter1 === 3 || counterFilter2 === 3 || counterFilter3 === 3) {
            counter++
          }
          for (const key in item) {
            for (const j of this.filters) {
              if (key !== 'favorite' && key !== 'quantity' && key !== 'year' && key !== 'num' && key !== 'img' && key !== 'name') {

                if (String(item[key as keyof typeof item]).toLowerCase() == j) {
                  counter++

                  if ((filterCompanyFlag === true || filterColorFlag === true || filterCamFlag === true) && (counterFilter1 === this.filters.length || counterFilter2 === this.filters.length || counterFilter3 === this.filters.length)) {
                    return item
                  } else if (counter === this.filters.length) {
                    return item
                  }
                }
              }
            }
          }
        })

        const catalog = document.querySelector('.catalog') as HTMLElement
        catalog.innerHTML = ''

        if (this.filters.length === 0) {
          this.cards.draw(data)
          dataFiltered = data
          this.dataFiltered = data
        } else {

          this.cards.draw(dataFiltered)
          this.dataFiltered = dataFiltered
        }
      }
    })
  }
  reset() {
    const reset = document.getElementById('reset') as HTMLElement
    reset.addEventListener('click', () => {
      this.filters = []
      this.dataFiltered = data
      this.cards.draw(data)
      const sliderYear = document.getElementById('sliderYear') as noUiSlider.target
      const sliderInstock = document.getElementById('sliderInstock') as noUiSlider.target
      if (sliderYear.noUiSlider !== undefined && sliderInstock.noUiSlider !== undefined) {
        sliderYear.noUiSlider.reset()
        sliderInstock.noUiSlider.reset()
      }
    })
  }

  addToCart() {
    const catalog = document.querySelector('.catalog') as HTMLElement

    const cartCounter = document.querySelector('.cart-mark') as HTMLElement

    catalog.addEventListener('click', (e) => {
      const el = e.target as HTMLElement;
      if (el !== null && el.className === 'item__addcart') {
        const arr = this.data.filter(function (item) {
          if (typeof el.previousElementSibling?.previousElementSibling?.textContent?.toLowerCase() === 'string') {
            return item.name.toLowerCase().indexOf(el.previousElementSibling?.previousElementSibling?.textContent?.toLowerCase()) > -1;
          }
        })
        if (!this.dataInCart.includes(arr[0])) {
          this.dataInCart.push(arr[0])
          el.textContent += ' ✓'
        } else {
          this.dataInCart = this.dataInCart.filter(item => item !== arr[0])
          el.textContent = 'Add to cart'
        }
        if (this.dataInCart.length > 0) {
          cartCounter.style.display = 'flex'
          cartCounter.textContent = String(this.dataInCart.length)
        } else {
          cartCounter.style.display = 'none'
          cartCounter.textContent = ''
        }
      }
    })
  }
}

export default Controller