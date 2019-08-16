// A lot of this code was based heavily off of Karthik Thota's youtube tutorial "Introduction to d3.js = Pie Chart and Donut Chart"
// The legend code was from Crypters Infotech's youtube tutorial "Pie Chart using D3.js"
export const COLORS = ["#a6751e", "#e7ab04", "#66a51e", "#7470b3", "#e82b8a"]
// export const LABELS = ["Property Taxes", "Sales and Gross Receipts Taxes", "License Taxes", "Income Taxes", "Other Taxes"]
export const LABELS = ["Other Taxes", "Income Taxes", "License Taxes", "Property Taxes", "Sales and Gross Receipts Taxes"]
// export function PieChartGenerator(csvPath, sector, amount, state, multiplier = 1, skip = 1) {
export function PieChartGenerator(state, tax_type, pie_num) {

    let TOTAL = 0;
    let TYPES = []
    // CIRCLE TIME BABY
    // margin and radius
    const margin = { top: 200, right: 200, bottom: 200, left: 200 },
        height = 1000 - margin.top - margin.bottom,
        width = 1000 - margin.left - margin.right,
        radius = width / 2;

    const colors = d3.scaleOrdinal(d3.schemeDark2);

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
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")

    // import data
    d3.csv("./src/assets/data/FY2018_tax_revenue_detailed.csv").then(function (data) {
        // parse

        data.forEach((d, i) => {
            
            if (d.Geo_Name === state) {
                if (d.item === "T00") {
                    TOTAL = d.AMOUNT.split(',').join('') * 1000;
                }
                
                if (tax_type.includes(d.item)) {
                    TYPES.push({
                        key: d.Tax_Type,
                        amount: d.AMOUNT.split(',').join('') * 1000
                    }) 
                    d.key = d.Tax_Type;
                    d.amount = d.AMOUNT.split(',').join('') * 1000;
                }
            }
        })

        const g = svg.selectAll(".arc")
            .data(pie(data))
            .enter().append("g")  // And this line to grow the number of g's to the data set size
            .attr("class", "arc")
            .style("display", (d, i) => d.value === TOTAL ? "none" : "null");  // attempt to render half the chart invisible
            
        // append the path of the arc
        g.append("path")
            .attr("d", arc)
            .style("fill", d => colors(d.data.key))

        if (pie_num === 2) {// flip the second pie
            g.style("transform", "scaleX(-1)");
        }
        // event handlers
        g.on("mouseover", ele => {
            console.log(ele)
            h1.text(ele.data.key + " accounts for $" + d3.format(',')(ele.data.amount) + " out of $" + d3.format(',')(TOTAL))
            h2.text("This is " + String((ele.data.amount / TOTAL) * 100).slice(0, 5) + "% of the total")
        })
        .on("mouseout", ele => {
            h1.text(state + "'s tax revenue for 2019 was $" + d3.format(',')(TOTAL))
            h2.text("")
        });

        const legends = svg.append("g").attr("transform", "translate(0, -50)")
            .selectAll(".legends").data(TYPES);

        const legend = legends.enter().append("g").classed("legends", true).attr("transform", (d , i) => "translate(0," + (i+1) * 30 +  ")");
        legend.append("rect")
            .attr("width", 20)
            .attr("height", 20);

        debugger
        legend.attr("fill", (d, i) => i ? COLORS[i - 1] : null)
            .attr("display", (d, i) => i ? "null" : "none")

        legend.append("text").classed("label", true).text((d, i) => LABELS[i-1])
            .attr("fill", (d, i) => i ? COLORS[i - 1] : null)
            .attr("x", 30)
            .attr("y", 20)
            
    })
        .catch(error => { if (error) throw error })


    const h1 = d3.select("main")
        .append("h1")

    const h2 = d3.select("main")
        .append("h2")

    const pieTween = b => {
        b.innerRadius = 0;
        const i = d3.interpolate({ startAngle: 0, endAngle: 0 }, b)
        return (t) => { return arc(i(t)) }
    }    
}
