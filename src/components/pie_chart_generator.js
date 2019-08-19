// A lot of this code was based heavily off of Karthik Thota's youtube tutorial "Introduction to d3.js = Pie Chart and Donut Chart"
// The legend code was from Crypters Infotech's youtube tutorial "Pie Chart using D3.js"

import { assignBox, findAmount, budgetCircle } from './helper_functions'
import { subData, cssSubDataDisplay } from './event_handlers'
// 
const COLORS = ["#a6751e", "#9a0047", "#66a51e", "#7470b3", "#e82b8a"]
export const CIRCLE_COLORS = [COLORS[1], COLORS[0], COLORS[4], COLORS[2], COLORS[3]]
// export const LABELS = ["Property Taxes", "Sales and Gross Receipts Taxes", "License Taxes", "Income Taxes", "Other Taxes"]
export const LABELS = ["Other Taxes", "Income Taxes", "License Taxes", "Property Taxes", "Sales Taxes"]
// export function PieChartGenerator(csvPath, sector, amount, state, multiplier = 1, skip = 1) {
export function PieChartGenerator(state, tax_type, pie_num, csv = "./src/assets/data/FY2018-STC-Detailed-Table.csv") {

    // const remove = document.getElementById("totals-" + pie_num)
    // remove ? remove.parentNode.removeChild(remove) : null

    // const remove2 = document.getElementById("details-" + pie_num)
    // remove2 ? remove2.parentNode.removeChild(remove2) : null

    const h1 = d3.select('#totals-header-' + pie_num)
    const span = d3.select('#totals-span-' + pie_num)
    const h2 = d3.select("#details-" + pie_num)


    let TOTAL = 0;
    let TYPES = []
    // CIRCLE TIME BABY
    // margin and radius
    const margin = { top: 200, right: 200, bottom: 200, left: 200 },
        height = 1000 - margin.top - margin.bottom,
        width = 1000 - margin.left - margin.right,
        radius = width / 2;



    const colors = d3.scaleOrdinal(COLORS);

    // arc generator
    const arc = d3.arc()
        .outerRadius(radius - 10)
        // .innerRadius(0); // for circle
        .innerRadius(radius - 100) // for donut

    // const lableArc = d3.arc()
    //     .outerRadius(radius - 50)
    //     .innerRadius(radius - 50);

    // pie generator
    const pie = d3.pie()
        // .sort(null)
        .value(d => d.amount);

    // define svg 
    const svg = d3.select(".pie-" + pie_num).append("svg")
        .attr("id", "svg-" + pie_num)
        .attr("class", "svg-" + pie_num)
        .attr("position", "relative")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")

    // import data
    d3.csv(csv).then(function (data) {
        // initialize arrays that will contain the sub level tax data
        let sales_taxes = []
        let license_taxes = []
        let income_taxes = []
        let other_taxes = []
        // let sales_tax_obj = { tax_group: LABELS[4] }
        // parse the csv
        data.forEach((d, i) => {
            
            if (d.Geo_Name === state) {
                if (d.item === "T00") {
                    TOTAL = d.AMOUNT.split(',').join('') * 1000;
                }
                
                if (d.item != "T00" && d.item != "T01") {  // don't want to catch Total or Property Taxes
                    let tax_obj = {
                        key: d.Tax_Type,
                        amount: findAmount(d.AMOUNT),
                        percent_of_total: (findAmount(d.AMOUNT) / TOTAL) * 100,
                    }

                    switch (d.item.slice(0,2)) { // fill up sub arrays
                        case "T0":
                            sales_taxes.push(tax_obj)            
                            // sales_tax_obj[d.Tax_Type] = findAmount(d.AMOUNT)
                            break;
                        case "T1":
                            sales_taxes.push(tax_obj)
                            break;
                        case "T2": 
                            license_taxes.push(tax_obj)
                            break;
                        case "T4":
                            income_taxes.push(tax_obj)
                            break;
                        case "T5":
                            other_taxes.push(tax_obj)
                            break;
                        case "T9":
                            other_taxes.push(tax_obj)
                            break;
                    }
                }

                if (tax_type.includes(d.item)) {
                    if (d.item != 'T00') {
                        TYPES.push({
                            key: d.Tax_Type,
                            amount: findAmount(d.AMOUNT),
                            percent: ((findAmount(d.AMOUNT)) / TOTAL) * 100
                        }) 
                    }
                    d.key = d.Tax_Type;
                    d.amount = findAmount(d.AMOUNT);
                    d.percent = ((findAmount(d.AMOUNT)) / TOTAL) * 100;
                }
            }
        })
        
        const container_array = []  // setting up container array for passing into click handler
        container_array.push(sales_taxes)
        container_array.push(license_taxes)
        container_array.push(income_taxes)
        container_array.push(other_taxes)
        // set h1 after total has been defined
        h1.text(state + "'s tax revenue for 2018 was ")
        span.text("$" + d3.format(',')(TOTAL))
        h2.text("")
        // attempt budgetCircle call
        budgetCircle(TOTAL)
        // set up the percentages in the center box
        assignBox(TYPES, pie_num)

        const g = svg.selectAll(".arc")
            .data(pie(data))
            .enter().append("g")  // And this line to grow the number of g's to the data set size
            .attr("class", "arc")
            .style("display", (d, i) => d.value === TOTAL ? "none" : "null");  // attempt to render half the chart invisible
            
        // append the path of the arc
        const path = g.append("path")
            .attr("d", arc)
            .style("fill", d => colors(d.data.key))
            .transition()
            .ease(d3.easeLinear)
            .duration(500)
            .attrTween('d', pieTween);
        
        // path.on("mouseover", (d, i) => {  // why doesn't this work?
        //         console.log(d)
        //         d3.select(this).transition()
        //             .duration('50')
        //             .attr('opacity', '.85')
        //             .attr("cursor", 'pointer')
        //     })
        // determine how to flip the pies
        if (pie_num === 2) {// flip the second pie
            g.attr("position", "absolute")
            g.style("transform", "scaleX(-1) translate(300px, 0px) scaleY(-1)");
        } else {
            g.style("transform", "scaleY(-1)");
        }
        // event handlers
        g.on("mouseover", (d, i) => {  
            console.log(d)
            d3.select(this).transition()
                .duration('50')
                .attr('opacity', '.85')
                .attr("cursor", 'pointer')
        })
        g.on("mouseout", ele => {
            // h1.text(state + "'s tax revenue for 2018 was $" + d3.format(',')(TOTAL))
            // h2.text("")
        })
        const span1 = document.getElementById('totals-span-1')
        const span2 = document.getElementById('totals-span-2')

        if (span1.innerText
            && span2.innerText) {
            const total1 = parseInt(span1.innerText.slice(1).split(',').join(''))
            const total2 = parseInt(span2.innerText.slice(1).split(',').join(''))
            budgetCircle(total1, total2)
        }       
                
    })
    .catch(error => { if (error) throw error })
    
    const pieTween = b => {
        b.innerRadius = 0;
        const i = d3.interpolate({ startAngle: 0, endAngle: 0 }, b)
        return (t) => { return arc(i(t)) }
    }    
            
        }
        