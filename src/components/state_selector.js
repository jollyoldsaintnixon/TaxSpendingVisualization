import { PieChartGenerator } from './pie_chart_generator'
import { tooltipCreator } from './subdata_generator'

export const TOP_LEVEL = ['T00', 'T01', 'TA1', 'TA3', 'TA4', 'TA5']
const STATE_NAMES = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming']

export const state_selector = (pie_num) => {
 
    const wrapper = document.createElement('div')
    wrapper.classList.add("class", "select-wrapper-" + pie_num)
    wrapper.id = "select-wrapper-" + pie_num

    const select = document.createElement("span")
    select.innerHTML = pie_num === 1 ? 'Alabama' : 'Wyoming'
    select.classList.add("class", "select-" + pie_num)
    select.id = "select-" + pie_num

    wrapper.addEventListener('click', e => {
        e.stopPropagation()
        state_list.classList.toggle('hidden')
    })
    
    const body = document.getElementsByTagName('body')[0]  // add an event listener so that if I click anywhere else the list disappears
    body.addEventListener('click', e => {
        state_list.classList.add('hidden')
    })
    
    const stateSelector = state => {
            return e => {
            // const state = e.target.value
            const select = document.getElementById("select-" + pie_num)
            select.innerText = state
            const svg = document.getElementById("svg-" + pie_num)
            svg.parentNode.removeChild(svg)
            PieChartGenerator(state, TOP_LEVEL, pie_num)
            tooltipCreator(pie_num)
        }
    }
    const state_list = document.createElement('ul')
    state_list.classList.add('state-list-' + pie_num)
    state_list.classList.add('hidden')
    state_list.id = 'state-list-' + pie_num
    
    STATE_NAMES.forEach(state => {
        const state_list_item = document.createElement('li')

        state_list_item.innerHTML = state
        state_list_item.setAttribute("value", state)
        state_list_item.addEventListener("click", stateSelector(state))
        state_list.appendChild(state_list_item)
    })
    
    wrapper.appendChild(select)
    wrapper.appendChild(state_list)
    
    return wrapper
}

// const phaseOut = (node) => {

//     node.parentNode.removeChild(node)
// }