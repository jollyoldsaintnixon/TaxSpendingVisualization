import { COLORS, LABELS} from './pie_chart_generator'

export const pieLegend = () => {
    const master_list = document.createElement("ul")
    master_list.classList.add('master-list')

    const left_list = document.createElement('ul')
    const text_list = document.createElement('ul')
    const right_list = document.createElement('ul')

    left_list.classList.add('left-list')  
    text_list.classList.add('text-list')  
    right_list.classList.add('right-list') 

    for (let i = LABELS.length - 1 ; i >= 0; i--) {
        
        const left_box = document.createElement('li')
        const text_box = document.createElement('li')
        const right_box = document.createElement('li')

        left_box.classList.add('box', 'left-box')
        left_box.id = ('left-box-' + i)
        left_box.style.color = COLORS[i]

        right_box.classList.add('box', 'right-box')
        right_box.id = ('right-box-' + i)
        right_box.style.color = COLORS[i]

        text_box.classList.add('text-box')
        text_box.innerHTML = LABELS[i];
        text_box.style.backgroundColor = COLORS[i];
        text_box.style.color = "white";
        text_box.style.border = "2px solid " + COLORS[i]

        left_list.appendChild(left_box)
        text_list.appendChild(text_box)
        right_list.appendChild(right_box)
    }

    master_list.appendChild(left_list)
    master_list.appendChild(text_list)
    master_list.appendChild(right_list)
    return master_list
}

const sublists = (label, color) => {
    const lists = []


    lestlist.classList.add('leftlist')
    textlist.classList.add('textlist')
    rightlist.classList.add('rightlist')

    const leftBox = document.createElement('li')
    const rightBox = document.createElement('li')



    const li = document.createElement('li')


    sublist.appendChild(leftBox)
    sublist.appendChild(li)
    sublist.appendChild(rightBox)
    return sublist
}