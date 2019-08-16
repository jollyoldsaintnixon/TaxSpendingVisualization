
import { PieChartGenerator } from './components/pie_chart_generator'
import { pieLegend } from './components/pie_legend'

const TOP_LEVEL = ['T00', 'T01', 'TA1', 'TA3', 'TA4', 'TA5']
const COLORS = ["blue", "red", "green", "yellow", "purple", "orange"]
// console.log(total)
const STATE_NAMES = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming']

document.addEventListener("DOMContentLoaded", () => {
    
    PieChartGenerator('Alaska', TOP_LEVEL, 1)
    PieChartGenerator("Alabama", TOP_LEVEL, 2)
    // PCG -> csvPath, sector, amout, location, multiplier, skip

    const root = document.getElementById("root")
    // const ul = pieLegend()
    const select = document.createElement("select")
    const stateSelector = e => {
            
            const svg = document.getElementById("svg-1")
            svg.parentNode.removeChild(svg)
            PieChartGenerator(e.target.value, TOP_LEVEL, 1)
    }
    STATE_NAMES.forEach(state => {
        const option = document.createElement("option")
        option.innerHTML = state
        option.setAttribute("value", state)
        // option.addEventListener("click", stateSelector(state))
        // option.setAttribute("onclick", stateSelector(state))
        select.appendChild(option)
    })
    select.addEventListener("change", stateSelector)
    root.appendChild(select)
})
