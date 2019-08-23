

export const budgetCircle = (total1, total2, update) => {
    // I got a lot of help from Ben Gao, an App Academy TA
    debugger
    if (!total1 || !total2) {
        return
    }
    total1 = Math.sqrt(total1)
    total2 = Math.sqrt(total2)

    const circle_container = d3.select('#budget-circle-container')

    const height = 300
    const width = 500
    
    const svg1 = document.getElementById('circle-svg-1') ? d3.select('#circle-svg-1') : circle_container.append('svg')
        .attr('width', width).attr('height', height)
        .attr('class', 'circle-svg').attr('id', 'circle-svg-1');
    const svg2 = document.getElementById('circle-svg-2') ? d3.select('#circle-svg-2') : circle_container.append('svg')
        .attr('width', width).attr('height', height)
        .attr('class', 'circle-svg').attr('id', 'circle-svg-2');

    const data = [total1, total2]
    debugger

    // const svg1 = circle_container.append('svg')
    //     .attr('width', width).attr('height', height)
    //     .attr('class', 'circle-svg').attr('id', 'circle-svg-1');

    // const svg2 = circle_container.append('svg')
    //     .attr('width', width).attr('height', height)
    //     .attr('class', 'circle-svg').attr('id', 'circle-svg-2');

    const rscale = d3.scaleLinear()
        .domain([0, (d3.max(data))])
        .range([1, height / 2])

        debugger
    if (!update) {
        const circle1 = svg1.selectAll('.circles-1').data([total1])
        const circle2 = svg2.selectAll('.circles-2').data([total2])
        circle1.enter().append('circle')
            .attr('r', function (d) {

                return rscale(d)
            })
            .attr('class', 'circles-1').attr('cy', height / 2)
            .attr('cx', (d, i) => width / 2)
            .attr('fill', '#0a80ae')

        circle2.enter().append('circle')
            .attr('r', function (d) {
                return rscale(d)
            })
            .attr('class', 'circles-2').attr('cy', height / 2)
            .attr('cx', (d, i) => width / 2)
            .attr('fill', '#0a80ae')
    } else {
        debugger
        d3.select('.circles-1')
        .data([total1])
        .transition().duration(500)
            .attr('r', function (d) {

                return rscale(d)
            })
        d3.select('.circles-2')
        .data([total2])
        .transition().duration(500)
            .attr('r', function (d) {

                return rscale(d)
            })
    }
    
}