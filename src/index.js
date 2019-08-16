
import { PieChartGenerator } from './components/pie_chart_generator'

const TOP_LEVEL = ['T01', 'TA1', 'TA3', 'TA4', 'TA5']
// console.log(total)
const STATE_NAMES = ['United States', 'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming']

document.addEventListener("DOMContentLoaded", () => {
    debugger
    PieChartGenerator("United States", TOP_LEVEL)
    // PCG -> csvPath, sector, amout, location, multiplier, skip

    window.chapel_hill = ["./src/assets/data/chapel_hill_2016.csv", 'function', 'revised_budget', 'C-Thrill']
    window.nc = ["./src/assets/data/NC_Budget_Data_FY2018-Update.csv", "Committee", "Appropriations", "North Carolina", 1, 3]
    window.cali = ["./src/assets/data/california_2019.csv", "StateAgencies", "TotalStateFunds", "California", 1000]
    const root = document.getElementById("root")
    const select = document.createElement("select")
    const stateSelector = e => {
            debugger
            const svg = document.getElementById("svg")
            svg.parentNode.removeChild(svg)
            PieChartGenerator(e.target.value, TOP_LEVEL)
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
