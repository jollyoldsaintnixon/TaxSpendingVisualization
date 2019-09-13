import { tooltipCreator } from './components/subdata_generator'
import { PieChartGenerator } from './components/pie_chart_generator'
import { pieLegend } from './components/pie_legend'
import { state_selector, TOP_LEVEL } from './components/state_selector'
import { budgetCircle } from './components/budget_circle'
import { wrapper } from './components/modal'
import './styles/app.scss'

document.addEventListener("DOMContentLoaded", () => {
    
    // PCG -> csvPath, sector, amout, location, multiplier, skip
    
    const root = document.getElementById("root")
    // const ul = pieLegend()
    const ul = pieLegend()
    const select_1 = state_selector(1)
    const select_2 = state_selector(2)
    const selector_container = document.getElementsByClassName("selector-container")[0]
    const yearSelector = yearSelector

    selector_container.appendChild(select_1)
    selector_container.appendChild(select_2)
    // making this to transform everything down while mainting main's size
    // const overall = document.createElement('section')
    // overall.classList.add('overall')
    // overall.appendChild(ul)

    PieChartGenerator("Alabama", TOP_LEVEL, 1, "./src/assets/data/FY2018-STC-Detailed-Table.csv", false)
    PieChartGenerator("Wyoming", TOP_LEVEL, 2, "./src/assets/data/FY2018-STC-Detailed-Table.csv", false)
    // tooltipCreator(1)
    // tooltipCreator(2)
    // Make the modal
    const modal = wrapper()
    const body = document.getElementsByTagName('body')

    root.appendChild(ul)
    root.appendChild(modal)
    
})
