
import { PieChartGenerator } from './components/pie_chart_generator'
import { pieLegend } from './components/pie_legend'
import { selector, TOP_LEVEL } from './components/selector'

document.addEventListener("DOMContentLoaded", () => {
    
    // PCG -> csvPath, sector, amout, location, multiplier, skip
    
    const root = document.getElementById("root")
    // const ul = pieLegend()
    const ul = pieLegend()
    const select_1 = selector(1)
    const select_2 = selector(2)
    const selector_container = document.getElementsByClassName("selector-container")[0]
    
    selector_container.appendChild(select_1)
    selector_container.appendChild(select_2)
    root.appendChild(ul)

    PieChartGenerator('Alabama', TOP_LEVEL, 1)
    PieChartGenerator("Alabama", TOP_LEVEL, 2)
})
