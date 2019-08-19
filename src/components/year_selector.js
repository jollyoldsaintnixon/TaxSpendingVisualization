const YEARS = [2018, 2017]

export const yearSelector = year => {
    const select = document.createElement("span")
    select.innerHTML = year
    select.classList.add("class", "year-select")
    select.id = 'year-select'
    select.addEventListener('click', e => {
        
    })

    const yearChoice = (year = 2018) => {
        return e => {
            const csv = e.target.value
            const select = document.getElementById('year-select')
            select.innerHTML = year
            // get states
            state1 = document.getElementById('select-1').innerHTML
            state2 = document.getElementById('select-2').innerHTML

            // make two new pies
            const svg1 = document.getElementById("svg-1")
            const svg2 = document.getElementById("svg-2")
            svg1.parentNode.removeChild(svg1)
            svg2.parentNode.removeChild(svg2)
            PieChartGenerator(state1, TOP_LEVEL, 1, csv)
            PieChartGenerator(state2, TOP_LEVEL, 2, csv)



            const side = pie_num === 1 ? "-left" : "-right"
            // const h2 = document.getElementsByClassName("year" + side)[0]
            // h2.innerHTML = year
        }
    }

    const state_list = document.createElement('ul')
    state_list.classList.add('year-list')
    state_list.classList.add('hidden')
    state_list.id = 'year-list'

    YEARS.forEach(year => {
        const year_list_item = document.createElement('li')
        state_list_item.setAttribute("value", `./src/assets/data/FY${year}-STC-Detailed-Table.csv`)
        year_list_item.innerHTML = year
        year_list_item.addEventListener("click", yearChoice(year))
        year_list.appendChild(year_list_item)
    })
}