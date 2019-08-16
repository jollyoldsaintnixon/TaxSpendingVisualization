import { COLORS, LABELS} from './pie_chart_generator'

export const pieLegend = () => {
    const ul = document.createElement("ul")
    ul.classList.add('tax-types-list')
    for (let i = 0; i < LABELS.length; i++) {
        const li = document.createElement('li')
        li.innerHTML = LABELS[i];
        li.style.color = COLORS[i]
        li.style.border = "2px solid " + COLORS[i]
        ul.appendChild(li)
    }
    return ul
}