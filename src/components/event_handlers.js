// container_array.push(sales_taxes)
// container_array.push(license_taxes)
// container_array.push(income_taxes)
// container_array.push(other_taxes)

export const subData = (container_array, pie_num, color_string = "#3F6D2A") => {
    // a lot of this code was learned from Michael Stanaland's "Stacked bar chart with tooltips" tutorial at http://bl.ocks.org/mstanaland/6100713
    return (ele) => {
        debugger
        const tax_type = ele.data.key

        const sub_array = subArrayLocator(tax_type, container_array)

        // setting up the tax stack to comply with d3 v5
        let tax_stack = { 
            // tax_type: tax_type,
        }
        // setting up keys
        let keys = []
        // keys.push(tax_type)
        sub_array.forEach((sub_tax, i) => {
            keys.push(sub_tax.key)
            tax_stack[sub_tax.key] = sub_tax.percent_of_total
        });

        const width = 90  // setting the dimensions to correspond to the pie charts'
        const height = 600

        const tooltipWidth = 120 // will alter these as needed
        const tooltipHeight = 40 

        const svg = d3.select("main").append("svg")
            .attr("width", width).attr("height", height)
            .append("g")

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
            .data(layer => layer) // pulling out each individual obj
            .enter().append("rect")
            .attr('x', d => xScale(0))  // passing each obj's x value to the d3 x function defined above
            .attr('y', layer => {
                // debugger
                return height - yScale(layer[1])})  // y0 is the height where each segment in the stack starts
            .attr('width', xScale(1))  // probably can hard code, since only one bar
            .attr('height', bar => {
                // debugger
                return yScale(bar[1] - bar[0])})
            .attr('fill', d => {
                debugger
                return colors.pop()
            })  // height is set to the starting point plus the height, and all that subtracted from the starting point due to y values begining at top of screen
        //     .on('mouseover', () => tooltip.style("display", true))  // want the info box to switch between visible and inivis based on mouseover
        //     .on('mouseout', () => tooltip.style("display", "none"))
        //     .on('mousemove', d => {  // this is going to be a sweet effect!
        //         const xPos = d3.mouse(this)[0] - (tooltipWidth / 2) // this[0] corresponds to mouse's x pos, and pushing it left by half of the tooltip's width ensure it is centered
        //         const yPos = d3.mouse(this)[1] - 25 // puts the tooltip up a bit above the cursor
        //         tooltip.attr("transform", "translate(" + xPos + ',' + yPos + ')')
        //         tooltip.select('text').text(d.percent) // shows the percent  
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

const subArrayLocator = (tax_type, container_array) => {  // helper function for finding the right sub array. A bit hard-coded.
    switch (tax_type) {
        case "Sales and Gross Receipts Taxes":
            return container_array[0]
        case "License Taxes": 
            return container_array[1]
        case "Income Taxes": 
            return container_array[2]
        case "Other Taxes": 
            return container_array[3]
    }
}

export const cssSubDataDisplay = (container_array, pie_num) => {

    const width = 90  // setting the dimensions to correspond to the pie charts'
    const height = 600

    return (ele) => {

        const remove = document.getElementById("sub-data-list-" + pie_num)
        remove ? remove.parentNode.removeChild(remove) : null
        
        const tax_type = ele.data.key
        const sub_array = subArrayLocator(tax_type, container_array) // get right sub_array
        // const groupTotal = groupTotal(sub_array) // not sure why this is not invoking the funciton below
        let total = 0
        sub_array.forEach(obj => {
            total += obj.amount
        });
        const root = document.getElementById("root") // grab the root to attach later

        const ul = document.createElement("ul") // set up ul container
        ul.classList.add("sub-data-list-" + pie_num)
        ul.id = ("sub-data-list-" + pie_num)

        sub_array.forEach(sub_tax => {
            const li = document.createElement('li')
            li.style.height = (sub_tax.percent_of_total * 6) + 'px'
            ul.appendChild(li)
        });

        root.appendChild(ul)
    }
}

const groupTotal = array => {
    let total = 0
    array.forEach(obj => {
        total += obj.amount
    });
    return total
}

// This function was taken from user Pimp Trizkits post on stackoverflow at https://stackoverflow.com/questions/5560248/programmatically-lighten-or-darken-a-hex-color-or-rgb-and-blend-colors
function LightenDarkenColor(col, amt) {
    var usePound = false;
    if (col[0] == "#") {
        col = col.slice(1);
        usePound = true;
    }

    var num = parseInt(col, 16);

    var r = (num >> 16) + amt;

    if (r > 255) r = 255;
    else if (r < 0) r = 0;

    var b = ((num >> 8) & 0x00FF) + amt;

    if (b > 255) b = 255;
    else if (b < 0) b = 0;

    var g = (num & 0x0000FF) + amt;

    if (g > 255) g = 255;
    else if (g < 0) g = 0;

    return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);
}
// This function was taken from user Pimp Trizkits post on stackoverflow at https://stackoverflow.com/questions/5560248/programmatically-lighten-or-darken-a-hex-color-or-rgb-and-blend-colors
const pSBC = (p, c0, c1, l) => {
    let r, g, b, P, f, t, h, i = parseInt, m = Math.round, a = typeof (c1) == "string";
    if (typeof (p) != "number" || p < -1 || p > 1 || typeof (c0) != "string" || (c0[0] != 'r' && c0[0] != '#') || (c1 && !a)) return null;
    if (!this.pSBCr) this.pSBCr = (d) => {
        let n = d.length, x = {};
        if (n > 9) {
            [r, g, b, a] = d = d.split(","), n = d.length;
            if (n < 3 || n > 4) return null;
            x.r = i(r[3] == "a" ? r.slice(5) : r.slice(4)), x.g = i(g), x.b = i(b), x.a = a ? parseFloat(a) : -1
        } else {
            if (n == 8 || n == 6 || n < 4) return null;
            if (n < 6) d = "#" + d[1] + d[1] + d[2] + d[2] + d[3] + d[3] + (n > 4 ? d[4] + d[4] : "");
            d = i(d.slice(1), 16);
            if (n == 9 || n == 5) x.r = d >> 24 & 255, x.g = d >> 16 & 255, x.b = d >> 8 & 255, x.a = m((d & 255) / 0.255) / 1000;
            else x.r = d >> 16, x.g = d >> 8 & 255, x.b = d & 255, x.a = -1
        } return x
    };
    h = c0.length > 9, h = a ? c1.length > 9 ? true : c1 == "c" ? !h : false : h, f = pSBCr(c0), P = p < 0, t = c1 && c1 != "c" ? pSBCr(c1) : P ? { r: 0, g: 0, b: 0, a: -1 } : { r: 255, g: 255, b: 255, a: -1 }, p = P ? p * -1 : p, P = 1 - p;
    if (!f || !t) return null;
    if (l) r = m(P * f.r + p * t.r), g = m(P * f.g + p * t.g), b = m(P * f.b + p * t.b);
    else r = m((P * f.r ** 2 + p * t.r ** 2) ** 0.5), g = m((P * f.g ** 2 + p * t.g ** 2) ** 0.5), b = m((P * f.b ** 2 + p * t.b ** 2) ** 0.5);
    a = f.a, t = t.a, f = a >= 0 || t >= 0, a = f ? a < 0 ? t : t < 0 ? a : a * P + t * p : 0;
    if (h) return "rgb" + (f ? "a(" : "(") + r + "," + g + "," + b + (f ? "," + m(a * 1000) / 1000 : "") + ")";
    else return "#" + (4294967296 + r * 16777216 + g * 65536 + b * 256 + (f ? m(a * 255) : 0)).toString(16).slice(1, f ? undefined : -2)
}