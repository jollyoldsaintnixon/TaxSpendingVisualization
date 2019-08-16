// A lot of this code was based heavily off of Karthik Thota's youtube tutorial "Introduction to d3.js = Pie Chart and Donut Chart"
// Many other videos and static resources were used, but this one had the most influence on the code by far.

// export function PieChartGenerator(csvPath, sector, amount, state, multiplier = 1, skip = 1) {
export function PieChartGenerator(state, tax_type) {

    let TOTAL = 0;
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

    const lableArc = d3.arc()
        .outerRadius(radius - 50)
        .innerRadius(radius - 50);

    // pie generator
    const pie = d3.pie()
        // .sort(null)
        .value(d => d.amount);

    // define svg 
    const svg = d3.select("main").append("svg")
        .attr("id", "svg")
        .attr("width", width)
        .attr("height", height)
        .style("display", "flex")
        .style("background", "yellow")
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    // import data
    d3.csv("./src/assets/data/FY2018_tax_revenue_detailed.csv").then(function (data) {
        // parse

        data.forEach((d, i) => {
            debugger
            if (d.Geo_Name === state) {
                if (d.item === "T00") {
                    TOTAL = d.AMOUNT.split(',').join('') * 1000;
                }
                if (tax_type.includes(d.item)) { 
                    d.key = d.Tax_Type;
                    d.amount = d.AMOUNT.split(',').join('') * 1000;
                }
            }
        })

        console.log(d3.format(',')(TOTAL))
        // attempt to nest
        const nestedData = d3.nest()
            .key(d => d.Geo_Name)
            .rollup(v => {
                return d3.sum(v, d => d.amount)
            })
            .entries(data)

        console.log(JSON.stringify(nestedData))
        // append g elements arc
        const g = svg.selectAll(".arc")
            .data(pie(data))

            // g.exit().remove();  // Throwing this line in to account for there being more g's than the current data set accounts for

            .enter().append("g")  // And this line to grow the number of g's to the data set size
            .attr("class", "arc");

        // append the path of the arc
        g.append("path")
            .attr("d", arc)
            .style("fill", d => colors(d.data.key))
            .on("mouseover", ele => {
                console.log(ele)
                h1.text(ele.data.key + " accounts for $" + d3.format(',')(ele.data.amount) + " out of $" + d3.format(',')(TOTAL))
                h2.text("This is " + String((ele.data.amount / TOTAL) * 100).slice(0, 5) + "% of the total")
            })
            .on("mouseout", ele => {
                h1.text(state + "'s tax revenue for 2019 was $" + d3.format(',')(TOTAL))
                h2.text("")
            });

        g.append("text")
            .style("fill", d => "black")
            // .ease(d3.easeLinear)
            // .duration(2000)
            .attr("transform", d => { return "translate(" + lableArc.centroid(d) + ")"; })
            .attr("dy", ".5em")
            .text(d => d.data.key)
            .style("width", "fit-content")
            .style("z-index", "1")
        // .ease(d3.easeLinear)
        // .duration(2000)
        // .attrTween("d", pieTween)


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
