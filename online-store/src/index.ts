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
});

const test1 = new Load()
test1.load()
