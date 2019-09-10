// class Modal {
//     constructor() {
//     }
export function wrapper() {
        const modal_wrapper = document.createElement('div')
        modal_wrapper.classList.add('modal-wrapper')
        modal_wrapper.addEventListener('click', e => {
            self = e.currentTarget
            self.style.display = 'none'
        })
        const form = modal()
        modal_wrapper.appendChild(form)

        return modal_wrapper
    }

function modal() {
        const form = document.createElement('form')
        form.classList.add('modal')

        const title = document.createElement('h1')
        title.innerText = 'How to use this app'

        const sub_title = document.createElement('h2')
        sub_title.innerText = 'Select two states to compare from the blue boxes in the top corners of the screen'

        const pie_chart_text = document.createElement('p')
        pie_chart_text.innerText = 'Half of a pie chart will be rendered for each state.  ' +
         '\xa0 The charts are broken down into colored sections representing the percent that each of five tax categories contributed to that state\'s tax revenue in 2018.' +
         '\n\n' + 'Click on a section to see how that tax category breaks down on the bar to the outside of the pie chart.  ' + 
         '\xa0 Hovering over the shaded bands on the bar reveals details about the corresponding sub tax category.  ' + 
         '\xa0 Each state renders the sales tax breakdown initially.' + '\n\n' +
         'The blue circles represent how the total tax revenue compares between the two states.' +'\n\n' +
         'This app represents taxes collected at the state level, therefore some tax categories may comprise a surprising percent of the state\'s tax revenue (such as property tax)'

        const submit = document.createElement('span')
        submit.innerText = 'Got it!'

        form.appendChild(title)
        form.appendChild(sub_title)
        form.appendChild(pie_chart_text)
        form.appendChild(submit)
        return form
    }
// }

