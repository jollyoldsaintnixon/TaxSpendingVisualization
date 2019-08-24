import { subArrayLocator, percentify, LightenDarkenColor, remove, removeClass } from './helper_functions'
import { CIRCLE_COLORS, LABELS } from './pie_chart_generator';
import { subDataLegend } from './sub_data_legend'

const width = 90  // setting the dimensions to correspond to the pie charts'
const height = 750
// const height = 90  // setting the dimensions to correspond to the pie charts'
// const width = 500

const tooltipWidth = 120 // will alter these as needed
const tooltipHeight = 40

// export const subData = (container_array, pie_num, color_string = "#3F6D2A") => {
//     // a lot of this code was learned from Michael Stanaland's "Stacked bar chart with tooltips" tutorial at http://bl.ocks.org/mstanaland/6100713

//     remove('sub-data-svg-' + pie_num)
//     remove('sub-data-legend-svg-' + pie_num)

    
//     const svg = d3.select("#sub-data-" + pie_num)
//         .append("svg") 
//         .attr("width", width).attr("height", height).attr('id', 'sub-data-svg-' + pie_num)
//         .append("g")
//         .attr('class', 'sub-data-' + pie_num).attr('id', 'sub-data-g-' + pie_num)
//     console.log(svg)
//     updateSubData(container_array, svg, pie_num)(null)
// }


export const updateSubData = (container_array, pie_num, ele) => {
    
    // return (ele) => {

        remove('sub-data-svg-' + pie_num)
        remove('sub-data-legend-svg-' + pie_num)


        const svg = d3.select("#sub-data-" + pie_num)
            .append("svg")
            .attr("width", width).attr("height", height)
            .attr('class', 'sub-data-svg-' + pie_num).attr('id', 'sub-data-svg-' + pie_num)
            .append("g")
            .attr('class', 'sub-data-' + pie_num).attr('id', 'sub-data-g-' + pie_num)
            // .style("transform", "scaleY(-1)")


        
        const tax_type = ele ? ele.data.key : "Sales and Gross Receipts Taxes"
        const color_string = colorChooser(tax_type)
        const sub_array = subArrayLocator(tax_type, container_array)
        let color_count = 0
        let id_count = 0
    
        let tax_stack = {}
        // setting up keys
        let keys = []
        // keys.push(tax_type)
        sub_array.forEach((sub_tax, i) => {
            keys.push(sub_tax.key)
            tax_stack[sub_tax.key] = sub_tax.percent_of_total
        });
    
        const stack = d3.stack()
            .keys(keys)
            .order(d3.stackOrderNone)
            .offset(d3.stackOffsetNone)
        let tax_stack_array = []
        tax_stack_array.push(tax_stack)
        const layers = stack(tax_stack_array)
    
        // const x = d3.scaleOrdinal()
        //     .domain(layers[0].map(d => d.x))
        //     // .range([10, width], 0)  // may be a quicker way to do this as there is only one bar
        //     .range([width])
        const xScale = d3.scaleLinear()
            .domain([0, 1])
            .range([0, width])
    
        // const colors = d3.scaleLinear()
        //     .domain([1, 10])
        //     .range(["red", "blue"])

        const new_colors = d3.scaleLinear().domain([0, keys.length])
            .range(["white", color_string])
        
        // const colors = [color_string]
        // const decrement = 100 / keys.length
        // let next_color = LightenDarkenColor(color_string, decrement)
        // while (colors.length < keys.length) {
        //     colors.push(next_color)
        //     next_color = LightenDarkenColor(next_color, decrement)
        // }    
        const yScale = d3.scaleLinear()
            .domain([0, d3.sum(Object.values(tax_stack))])  // the increment up to the total
            // .range([height, 0])
            .range([0, height])
    
        const g = svg.selectAll(".sub-taxes-" + pie_num)  // no g at this point, but they will have this class
            .data(layers).enter()  // now there will be a g for every bar within the graph.
            .append("g")
            .attr("class", "sub-taxes-" + pie_num)
            
        // .attr('fill', d => {
            
        //     return colors(d)})
    
        const rect = g.selectAll("rect")  // making each obj of the correspond to a rect within the g
            .data(layer => layer); // pulling out each individual obj
            rect.exit().remove();
            rect.enter().append("rect")
                .attr('x', d => xScale(0))
                .attr('width', xScale(1))  // probably can hard code, since only one bar
                .attr('id', (d, i) => {
                    return `stack-${pie_num}-${id_count++}`
                }).merge(rect)

            .transition()
            .duration(500)
            .attr('x', d => xScale(0))  // passing each obj's x value to the d3 x function defined above
            .attr('y', layer => {
                
                return height - yScale(layer[1])
            })  // y0 is the height where each segment in the stack starts
            .attr('width', xScale(1))  // probably can hard code, since only one bar
            .attr('height', bar => {
                
                return yScale(bar[1] - bar[0])
            })
            .attr('fill', (d, i) => {
                return new_colors(++color_count)
            }) 

        tooltipCreator(pie_num, tax_type)

    legendCreator(pie_num, keys, new_colors)
    // subDataLegend(new_colors, )

    // }

}

const colorChooser = (tax_type) => {
    switch (tax_type) {
        case "Sales and Gross Receipts Taxes":
            return CIRCLE_COLORS[4]
        case 'Property Taxes':
            return CIRCLE_COLORS[3]
        case "License Taxes":
            return CIRCLE_COLORS[2]
        case 'Income Taxes':
            return CIRCLE_COLORS[1]
        case 'Other Taxes':
            return CIRCLE_COLORS[0]
    }
}

export const tooltipCreator = (pie_num, tax_type, percent) => {
    const sub_data_details = document.getElementById(`data-details-type-${pie_num}`)
    const relative_percent_details = document.getElementById(`relative-percent-${pie_num}`)
    const overall_percent_details = document.getElementById(`overall-percent-${pie_num}`)
    const list = document.getElementById('sub-data-details-' + pie_num)
    const side = pie_num === 1 ? 'left' : 'right'
    const vanilla_svg = document.getElementById('sub-data-svg-' + pie_num)
    let index;

    if (!tax_type || tax_type === "Sales and Gross Receipts Taxes") {
        tax_type = 'Sales Taxes'
        index = LABELS.indexOf(tax_type)
        percent = document.getElementById(side + `-box-` + index).innerHTML
        percent = parseFloat(percent.slice(0, -1))
    }

    index = LABELS.indexOf(tax_type)
    sub_data_details.innerHTML = `${tax_type}`
    relative_percent_details.innerHTML = `Percent of total budget: ${percentify(percent)}`
    overall_percent_details.innerHTML = 'Scroll over side bar to see sub tax data for this category'
    list.style.background = CIRCLE_COLORS[index]
    // vanilla_svg.appendChild(vanilla_tooltip)
    
    vanilla_svg.addEventListener('mouseover', (e) => {
        index = LABELS.indexOf(tax_type)
        const split_id  = e.target.id.split('-')
        const legend_text = document.getElementById(`legend-text-${split_id[1]}-${split_id[2]}`)
        // const legend_item = document.getElementById(`legend-item-${split_id[1]}-${split_id[2]}`)
        const box_data = document.getElementById(side + `-box-` + index).innerHTML
        
        let relative_percent = (e.target.height.baseVal.value / height) * 100
        relative_percent = Math.round(100 * relative_percent) / 100
        
        let overall_percent = parseFloat(box_data.slice(0, -1))
        overall_percent = Math.round(100 * overall_percent * relative_percent / 100) / 100
        // let overall_percent = 
        // legend_item.classList.remove('hidden')
        overall_percent_details.innerHTML = `Percent of total budget: ` + overall_percent
        relative_percent_details.innerHTML = `Percent of category: ${relative_percent}`
        if (legend_text) { sub_data_details.innerHTML = legend_text.innerHTML }
        // debugger
        // console.log('color: ' + CIRCLE_COLORS[index])
        // list_color.style.border = `4px solid ${CIRCLE_COLORS[index]}`
        // vanilla_tooltip.classList.remove('hidden')
    })
    vanilla_svg.addEventListener('mouseout', e => {

    })

}

const legendCreator = (pie_num, keys, new_colors) => {

    let color_count = 0
    let id_count = 0

    const legend = d3.select("#sub-data-legend-" + pie_num)
        .append('svg')
        .attr('class', 'sub-data-legend-svg-' + pie_num).attr('id', 'sub-data-legend-svg-' + pie_num)
        .append('g')

    id_count = 0

    legend.selectAll('text')
        .data(keys.reverse())
        .enter()
        .insert('text')
        .text(function (d) {
            return d;
        })
        .attr('x', 18).attr('y', '0')
        .attr('text-anchor', 'start')
        .attr('alignment-baseline', 'hanging')
        .attr('class', 'hidden')
        .attr('id', d => {
            return `legend-text-${pie_num}-${id_count++}`;
        })
}

