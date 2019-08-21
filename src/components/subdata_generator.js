import { subArrayLocator, LightenDarkenColor } from './helper_functions'
import { CIRCLE_COLORS } from './pie_chart_generator';

export const subData = (container_array, pie_num, color_string = "#3F6D2A") => {
    // a lot of this code was learned from Michael Stanaland's "Stacked bar chart with tooltips" tutorial at http://bl.ocks.org/mstanaland/6100713
    return (ele) => {
        debugger

        const tax_type = ele.data.key
        color_string = colorChooser(tax_type)
        const sub_array = subArrayLocator(tax_type, container_array)

        
        let tax_stack = {}
        // setting up keys
        let keys = []
        // keys.push(tax_type)
        sub_array.forEach((sub_tax, i) => {
            keys.push(sub_tax.key)
            tax_stack[sub_tax.key] = sub_tax.percent_of_total
        });

        const width = 90  // setting the dimensions to correspond to the pie charts'
        const height = 500

        const tooltipWidth = 120 // will alter these as needed
        const tooltipHeight = 40
        
        const svg = d3.select("#sub-data-" + pie_num)
            .append("svg") 
            .attr("width", width).attr("height", height)
            .append("g").attr('class', 'sub-data-' + pie_num)

        // set the layers of the stacked bar
        // const layers = d3.stack()([tax_type].map(tax => {  // should ultimately just be the one layer
        //     return sub_array.map(d => {
        //         return { x: d.key, y: d.amount, percent: d.percent }
        //     })
        // }))
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

        const colors = [color_string]
        const decrement = 100 / keys.length
        let next_color = LightenDarkenColor(color_string, decrement)
        while (colors.length < keys.length) {
            colors.push(next_color)
            next_color = LightenDarkenColor(next_color, decrement)
        }

        console.log(colors)

        const yScale = d3.scaleLinear()
            .domain([0, d3.sum(Object.values(tax_stack))])  // the increment up to the total
            // .range([height, 0])
            .range([0, height])

        const g = svg.selectAll(".sub-taxes")  // no g at this point, but they will have this class
            .data(layers).enter()  // now there will be a g for every bar within the graph.
            .append("g").attr("class", "sub-taxes")
        // .attr('fill', d => {
        //     // debugger
        //     return colors(d)})

        const rect = g.selectAll("rect")  // making each obj of the correspond to a rect within the g
            .data(layer => layer); // pulling out each individual obj
        rect.exit().remove();
        rect.enter().append("rect")
            .attr('x', d => xScale(0))  // passing each obj's x value to the d3 x function defined above
            .attr('y', layer => {
                // debugger
                return height - yScale(layer[1])
            })  // y0 is the height where each segment in the stack starts
            .attr('width', xScale(1))  // probably can hard code, since only one bar
            .attr('height', bar => {
                // debugger
                return yScale(bar[1] - bar[0])
            })
            .attr('fill', d => {
                // debugger
                return colors.pop()
            })  // height is set to the starting point plus the height, and all that subtracted from the starting point due to y values begining at top of screen
        //     .on('mouseover', () => tooltip.style("display", true))  // want the info box to switch between visible and inivis based on mouseover
        //     .on('mouseout', () => tooltip.style("display", "none"))
        //     .on('mousemove', d => {  // this is going to be a sweet effect!
        //         const xPos = d3.mouse(this)[0] - (tooltipWidth / 2) // this[0] corresponds to mouse's x pos, and pushing it left by half of the tooltip's width ensure it is centered
        //         const yPos = d3.mouse(this)[1] - 25 // puts the tooltip up a bit above the cursor
        //         tooltip.attr("transform", "translate(" + xPos + ',' + yPos + ')')
        //         tooltip.select('text').text(d.percent_of_total) // shows the percent  
        //     })

        // const tooltip = svg.append('g') // setting up this sweet tooltip. Exciting!
        //     .attr('class', 'sub-data-tooltip tooltip').style('display', 'none') // starts invisible
        //     // adding the dimensions of the box
        //     .append('rect').attr('width', tooltipWidth)
        //     .attr('height', tooltipHeight).attr('fill', 'white').style('opacity', 0.5) // making it partially see-through
        //     // adding the text content
        //     .append('text').attr('x', 15)
        //     .attr('dy', '.8em').style('text-anchor', 'middle')
    }
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

