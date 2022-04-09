
const TOTAL_HEADERS_COUNT = 2

export function getScale() {

}

export function getSteps() {

}

export function drawSteps() {

}

export function drawPoints(data, element, xCenter, yCenter) {

}

export function drawAxes(data, element, xCenter, yCenter) {
    var totalAxes = Object.keys(data).length - TOTAL_HEADERS_COUNT      // Ignores seasons and team name.
    var axesData = [...Array(totalAxes).keys()]                         // Generates an array from 0 to the number of axes.

    element.append('g')
        .attr('class', 'axes')
        .selectAll('line')
        .data(axesData)
        .enter()
        .append('line')
        .attr('x1', xCenter)
        .attr('y1', yCenter)
        .attr('x2', function(d, i) { return xCenter * (1 - Math.sin(i * 2 * Math.PI / totalAxes)); })
        .attr('y2', function(d, i) { return yCenter * (1 - Math.cos(i * 2 * Math.PI / totalAxes)); })
        .attr('stroke', 'black')
        .attr("stroke-width", "1px")
}

export function drawCircles() {

}

export function drawShape() {

}

export function drawTitle(data, element, xCenter) {
    element.append('text')
        .text(data.Season)
        .attr('x', xCenter)
        .attr('y', 0)
        .style('color', 'black')
        .style('font-size', '12px')
}

export function eraseAll(element) {
    element.selectAll('*').remove()
}