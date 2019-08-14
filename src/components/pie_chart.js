import bf_array from './federal_object_array'

// CIRCLE TIME BABY
const section = document.createElement('section')
// margin and radius
const margin = {top: 20, right: 20, bottom: 20, left: 20},
    height = 500 - margin.top - margin.bottom,
    width = 500 - margin.left - margin.right,
    radius = width/2;

// const color = d3.scaleOrdinal()
//     .range(['dark-blue', 'blue', 'light-blue'])

// arc generator
const arc = d3.arc()
    .outerRadius(radius - 10)
    // .innerRadius(0); // for circle
    .innerRadius(radius - 70) // for donut

const lableArc = d3.arc()
    .outerRadius(radius - 50)
    .innerRadius(radius - 50);

// pie generator
const pie = d3.pie()
    .sort(null)
    .value(d => d["amount"]);

// define svg 
const svg = d3.select("section").append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + width/2 + "," + height/2 + ")");

// import data


// append g elements arc
const g = svg.selectAll(".arc")
    .data(pie(bf_array))
    .enter().append("g")
    .attr("class", "arc");

// append the path of the arc
g.append("path")
    .attr("d", arc)
    .style("fill", d => color(d.data["name"]))
    // .ease(d3.easeLinear)
    // .duration(2000)
    // .attrTween("d", pieTween)

// append labels
g.append("text")
    .style("fill", d => "blue")
    // .ease(d3.easeLinear)
    // .duration(2000)
    .attr("transform", d => {return "translate(" + lableArc.centroid(d) + ")";})
    .attr("dy", ".5em")
    .text(d => d.data["name"])
    
const pieTween = b => {
    b.innerRadius = 0;
    const i = d3.interpolate({startAngle: 0, endAndle: 0}, b)
    return (t) => { return arc(i(t))}
}    
export default section

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
