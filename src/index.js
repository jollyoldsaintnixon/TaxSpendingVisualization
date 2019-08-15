
import { PieChartGenerator } from './components/pie_chart_generator'

// console.log(total)
document.addEventListener("DOMContentLoaded", () => {
    debugger
    PieChartGenerator("./src/assets/data/FY2018_tax_revenue_detailed.csv", "All")
    // PCG -> csvPath, sector, amout, location, multiplier, skip

    window.chapel_hill = ["./src/assets/data/chapel_hill_2016.csv", 'function', 'revised_budget', 'C-Thrill']
    window.nc = ["./src/assets/data/NC_Budget_Data_FY2018-Update.csv", "Committee", "Appropriations", "North Carolina", 1, 3]
    window.cali = ["./src/assets/data/california_2019.csv", "StateAgencies", "TotalStateFunds", "California", 1000]
    const root = document.getElementById("root")
    const h3 = document.createElement("h3")
    root.appendChild(h3)
})
