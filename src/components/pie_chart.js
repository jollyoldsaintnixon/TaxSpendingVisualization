// A lot of this code was based heavily off of Karthik Thota's youtube tutorial "Introduction to d3.js = Pie Chart and Donut Chart"
// Many other videos and static resources were used, but this one had the most influence on the code by far.


let TOTAL = 0;
// CIRCLE TIME BABY
// margin and radius
const margin = {top: 200, right: 200, bottom: 200, left: 200},
    height = 1000 - margin.top - margin.bottom,
    width = 1000 - margin.left - margin.right,
    radius = width/2;
    
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
const svg = d3.select("svg")
.attr("width", width)
.attr("height", height)
.style("display", "flex")
.style("background", "yellow")
.append("g")
.attr("transform", "translate(" + width/2 + "," + height/2 + ")");
    
    // import data
d3.csv("./src/assets/data/california_2019.csv").then(function(data) {   
        // parse
        
    data.forEach(d => {
        d.sector = d.StateAgencies;
        d.amount = +d.TotalStateFunds;
        TOTAL += +d.TotalStateFunds;
    })
    
    console.log(TOTAL)
    // append g elements arc
    const g = svg.selectAll(".arc")
    .data(pie(data))

    // g.exit().remove();  // Throwing this line in to account for there being more g's than the current data set accounts for

    .enter().append("g")  // And this line to grow the number of g's to the data set size
    .attr("class", "arc");
    
    // append the path of the arc
    g.append("path")
    .attr("d", arc)
    .style("fill", d => colors(d.data.sector))
    .on("mouseover", ele => {
        console.log(ele)
        h1.text(ele.data.sector + " accounts for $" + ele.data.amount + " out of $" + TOTAL)
        h2.text("This is " + String((ele.data.amount / TOTAL) * 100).slice(0, 5) + "% of the total")
    })
    .on("mouseout", ele => {
        h1.text("California's total budget for 2019 was $" + TOTAL)
        h2.text("")
    });
    
    g.append("text")
    .style("fill", d => "black")
    // .ease(d3.easeLinear)
    // .duration(2000)
    .attr("transform", d => {return "translate(" + lableArc.centroid(d) + ")";})
    .attr("dy", ".5em")
    .text(d => d.data.sector)
    .style("width", "fit-content")
    .style("z-index", "1")
    // .ease(d3.easeLinear)
    // .duration(2000)
    // .attrTween("d", pieTween)


})
    .catch(error => { if (error) throw error})
    .then(() => {
        const all = d3.selectAll('g')
})
    
    
const h1 = d3.select("main")
    .append("h1")

const h2 = d3.select("main")
    .append("h2")
    
    const pieTween = b => {
        b.innerRadius = 0;
    const i = d3.interpolate({startAngle: 0, endAngle: 0}, b)
    return (t) => { return arc(i(t))}
}    


// export default svg

// let total = 0
// let bf_array = []
// fedFy2018["results"].forEach(budget_function => {
//     total += budget_function["amount"];
//     bf_array.push({ 
//         name: budget_function["name"],
//         amount: budget_function["amount"],
//         degrees: 0
//     });
// });

// const section = document.createElement("section")
// const h3 = document.createElement("h3")
// h3.textContent = "Total: " + total.toLocaleString()
// section.appendChild(h3)

// const ul = document.createElement("ul")

// for (let i = 0; i < bf_array.length; i++) {
//     const li = document.createElement("li")

//     const percent = String((bf_array[i]["amount"] / total) * 100).slice(0, 5) + "%"
//     const amount = bf_array[i]["amount"].toLocaleString()
//     bf_array[i]["degrees"] = Math.PI * 2 * (bf_array[i]["amount"] / total)
//     li.textContent = bf_array[i]["name"] + ": $" + amount + ", percent of total: " + percent
//         + " degrees: " + String(bf_array[i]["degrees"])

//     ul.appendChild(li)
// }
// const h4 = document.createElement("h4")
// const h5 = document.createElement('h5')
// h4.textContent = totalDegrees
// h5.textContent = (2 * Math.PI)
