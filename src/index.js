
import { PieChartGenerator } from './components/pie_chart_generator'
import { pieLegend } from './components/pie_legend'
import { selector, TOP_LEVEL } from './components/selector'

document.addEventListener("DOMContentLoaded", () => {
    
    PieChartGenerator('Alaska', TOP_LEVEL, 1)
    PieChartGenerator("Alabama", TOP_LEVEL, 2)
    // PCG -> csvPath, sector, amout, location, multiplier, skip

    const root = document.getElementById("root")
    // const ul = pieLegend()
    const select_1 = selector(1)
    const select_2 = selector(2)
    const ul = pieLegend()
    
    root.appendChild(select_1)
    root.appendChild(select_2)
    root.appendChild(ul)
})
