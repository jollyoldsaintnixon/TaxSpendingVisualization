import { PieChartGenerator } from './pie_chart_generator'

export const TOP_LEVEL = ['T00', 'T01', 'TA1', 'TA3', 'TA4', 'TA5']

export const selector = (pie_num) => {
    const STATE_NAMES = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming']

    const stateSelector = e => {
        const svg = document.getElementById("svg-" + pie_num)
        svg.parentNode.removeChild(svg)
        PieChartGenerator(e.target.value, TOP_LEVEL, pie_num)
    }

    const select = document.createElement("select")
    select.setAttribute("class", "select-" + pie_num)

    STATE_NAMES.forEach(state => {
        const option = document.createElement("option")
        option.innerHTML = state
        option.setAttribute("value", state)
        // option.addEventListener("click", stateSelector(state))
        // option.setAttribute("onclick", stateSelector(state))
        select.appendChild(option)
    })
    select.addEventListener("change", stateSelector)
    return select
}