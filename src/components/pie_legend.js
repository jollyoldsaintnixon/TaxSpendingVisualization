import { COLORS, LABELS} from './pie_chart_generator'

export const pieLegend = () => {
    const ul = document.createElement("ul")
    for (let i = 0; i < LABELS.length; i++) {
        const li = document.createElement('li')
        li.innerHTML = LABELS[i];
        li.setAttribute("color", COLORS[i])
        ul.appendChild(li)
    }
    return ul
}