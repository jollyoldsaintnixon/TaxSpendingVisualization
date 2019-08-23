export const subDataLegend = (colors, labels, heights, pie_num) => {
    const master_sub_data_list = document.createElement("ul")
    master_sub_data_list.classList.add('master-sub-data-list-' + pie_num)
    master_sub_data_list.id = 'master-sub-data-list-' + pie_num

    const percent_list = document.createElement('ul')
    const label_list = document.createElement('ul')
    const color_box = document.createElement('ul')

    for (let i = labels.length - 1; i >= 0; i--) {

        // const relative_percent = document.createElement('li')
        // const overall_percent = document.createElement('li')
        const label = document.createElement('li')
        const color_box = document.createElement('li')

        text_box.classList.add('sub-data-label-' + pie_num)
        text_box.innerHTML = labels[i];
        text_box.style.backgroundColor = colors[i];
        text_box.style.color = "white";
        text_box.style.border = "2px solid " + CIRCLE_COLORS[i]
    }
}