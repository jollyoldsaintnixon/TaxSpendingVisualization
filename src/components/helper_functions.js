

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

export const budgetCircle = (total1, total2) => {
    // based on Matthew McKenna's example at http://bl.ocks.org/mpmckenna8/raw/566509dd3d9a08e5f9b2/
    if (!total1 || !total2) {
        return
    }
    total1 = Math.sqrt(total1)
    total2 = Math.sqrt(total2)
    // delete old circles
    const old_cirlce_1 = document.getElementById('circle-svg-1')
    const old_cirlce_2 = document.getElementById('circle-svg-2')
    old_cirlce_1 ? old_cirlce_1.parentNode.removeChild(old_cirlce_1) : null
    old_cirlce_2 ? old_cirlce_2.parentNode.removeChild(old_cirlce_2) : null
    
    const data = [total1, total2]

    const height = 300
    const width = 500

    const circle_container = d3.select('#budget-circle-container')

    const svg1 = circle_container.append('svg')
        .attr('width', width).attr('height', height)
        .attr('class', 'circle-svg').attr('id', 'circle-svg-1');

    const svg2 = circle_container.append('svg')
        .attr('width', width).attr('height', height)
        .attr('class', 'circle-svg').attr('id', 'circle-svg-2');

    const rscale = d3.scaleLinear()
        .domain([0, (d3.max(data)) ])
        .range([1, 150])

    svg1.selectAll('.circles').data([total1])
        .enter().append('circle')
        .attr('r', function (d) {
            
            return rscale(d)
        })
        .attr('class', 'circles').attr('cy', height / 2)
        .attr('cx', (d, i) => width / 2)

    svg2.selectAll('.circles').data([total2])
        .enter().append('circle')
        .attr('r', function (d) {
            return rscale(d)
        })
        .attr('class', 'circles').attr('cy', height / 2)
        .attr('cx', (d, i) => width / 2)
}