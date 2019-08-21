

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
        .attr('fill', '#0a80ae')

    svg2.selectAll('.circles').data([total2])
        .enter().append('circle')
        .attr('r', function (d) {
            return rscale(d)
        })
        .attr('class', 'circles').attr('cy', height / 2)
        .attr('cx', (d, i) => width / 2)
        .attr('fill', '#0a80ae')
}

export const subArrayLocator = (tax_type, container_array) => {  // helper function for finding the right sub array. A bit hard-coded.
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

// This function was taken from user Pimp Trizkits post on stackoverflow at https://stackoverflow.com/questions/5560248/programmatically-lighten-or-darken-a-hex-color-or-rgb-and-blend-colors
export function LightenDarkenColor(col, amt) {
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
// This function was also taken from user Pimp Trizkits post on stackoverflow at https://stackoverflow.com/questions/5560248/programmatically-lighten-or-darken-a-hex-color-or-rgb-and-blend-colors
export const pSBC = (p, c0, c1, l) => {
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