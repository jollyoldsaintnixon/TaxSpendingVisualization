

export const assignBox = (array_of_objs, pie_num) => {
    const side = pie_num === 1 ? 'left-box-' : 'right-box-'
    array_of_objs.forEach((obj) => {
        
        let i = 4;
        switch (obj.key) {
            case "Other Taxes":
                i = 0 
                break;
            case "Income Taxes":
                i = 1 
                break;
            case "License Taxes":
                i = 2 
                break;
            case "Property Taxes":
                i = 3 
                break;
        }
        const box = document.getElementById(side + i)
        const decimals = String(obj.percent).split('.')[1]
        const integers = String(obj.percent).split('.')[0]
        const sliced = obj.percent ? integers + '.' + decimals.slice(0, 2) : 0
        box.innerHTML = sliced + '%'
    });
}

// d.AMOUNT === 'X' ? 0 : d.AMOUNT.split(',').join('') * 1000,
export const findAmount = (amount) => {
    return amount === 'X' ? 0 : amount.split(',').join('') * 1000
}

// export const subDataPusher = (item) => {
//     if (item != "T00" && item != "T01") {
//         switch (item.slice(0, 2)) {
//             case ("T0" || "T1"):
//                 sales_taxes.push({
//                     key: d.Tax_Type,
//                     amount: findAmount(d.AMOUNT),
//                     percent: (findAmount(d.AMOUNT) / TOTAL) * 100
//                 })
//                 break;
    
//             case "T2":
//                 license_taxes.push({
    
//                 })
//                 break;
//         }
//     }
// }

export const budgetCircle = (datum1) => {
    // based on Matthew McKenna's example at http://bl.ocks.org/mpmckenna8/raw/566509dd3d9a08e5f9b2/
    debugger
    return datum2 => {
        debugger
        data = [datum1, datum2]

        const height = 100
        const width = 1000
    
        const root = document.getElementById('root')
        const circleDiv = document.createElement("div")
        circleDiv.classList.add("circle-container")
        circleDiv.id = "circle-container"
        circleDiv.style.display = "block"
        circleDiv.style.height = height
        circleDiv.style.width = width
        root.appendChild(circleDiv)
    
        const svg = d3.select('#circle-container').append('svg')
        .attr('width', width).attr('height', height).attr('class', 'circle-svg');
    
        const rscale = d3.scaleLinear()
            .domain([0, (d3.max(data)) ])
            .range([3, 20])
    
        svg.selectAll('.circles').data(data)
            .enter().append('circle')
            .attr('r', function (d) {
                return rscale(d)
            })
            .attr('class', 'circles').attr('cy', height / 2)
            .attr('cx', (d, i) => 20 + 40 * i)
    }
}