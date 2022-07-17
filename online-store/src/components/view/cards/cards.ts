import { IData } from "../../types/types";
import './cards.css'

class Cards {
  draw(data: IData[]): void {
    const catalog = document.querySelector('.catalog') as HTMLElement
    data.forEach(item => {
      const catalogItem = document.createElement('div') as HTMLElement
      const catalogItemTitle = document.createElement('h3') as HTMLElement
      const catalogItemImg = document.createElement('div') as HTMLElement
      const catalogItemQuantity = document.createElement('p') as HTMLElement
      const catalogItemYear = document.createElement('p') as HTMLElement
      const catalogItemComp = document.createElement('p') as HTMLElement
      const catalogItemColor = document.createElement('p') as HTMLElement
      const catalogItemSize = document.createElement('p') as HTMLElement

      catalog.append(catalogItem)
      catalogItem.classList.add('catalog__item')


      catalogItem.append(catalogItemTitle)
      catalogItemTitle.textContent = item.name

      catalogItem.append(catalogItemImg)
      catalogItemImg.classList.add('item__img')
      catalogItemImg.style.backgroundImage = `url("${item.img}")`

      catalogItem.append(catalogItemQuantity)
      catalogItemQuantity.textContent = `In stock: ${item.quantity}`

      catalogItem.append(catalogItemYear)
      catalogItemYear.textContent = `Produced in: ${item.year}`

      catalogItem.append(catalogItemComp)
      catalogItemComp.textContent = `Producent: ${item.shape}`

      catalogItem.append(catalogItemColor)
      catalogItemColor.textContent = `Color: ${item.color}`

      catalogItem.append(catalogItemSize)
      catalogItemSize.textContent = `Cameras qty.: ${item.size}`
    })
    if (data.length === 0) {
      const noResultsTitle = document.createElement('h2') as HTMLElement
      catalog.append(noResultsTitle)
      noResultsTitle.classList.add('catalog__no-results')
      noResultsTitle.textContent = `Sorry, we didn't find any results matching this search`
    }
  }
}

export default Cards