import Load from "./components/controller/load";
import './global.css'
import './noUiSlider.css'
import noUiSlider from "nouislider"
import wNumb from "wnumb"


const sliderYear = document.getElementById('sliderYear') as HTMLElement
const sliderInstock = document.getElementById('sliderInstock') as HTMLElement

noUiSlider.create(sliderYear, {
  start: [2000, 2022],
  connect: true,
  range: {
    'min': 2000,
    'max': 2022
  },
  tooltips: [
    wNumb({ decimals: 0 }),
    wNumb({ decimals: 0 })
  ],
  format: {
    to: function (value) {
      return Math.floor(value);
    },
    from: function (value) {
      return parseInt(value);
    },
  },
});

noUiSlider.create(sliderInstock, {
  start: [1, 12],
  connect: true,
  range: {
    'min': 1,
    'max': 12
  },
  tooltips: [
    wNumb({ decimals: 0 }),
    wNumb({ decimals: 0 })
  ],
  format: {
    to: function (value) {
      return Math.floor(value);
    },
    from: function (value) {
      return parseInt(value);
    },
  },
});

const test1 = new Load()
test1.load()

console.log('Самооценка для кросс - чека: 190 / 220')
console.log('Не выполненные пункты: 1. Нет local storage -30')
