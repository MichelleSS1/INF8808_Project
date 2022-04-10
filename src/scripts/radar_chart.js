// Constants used for style.
const TOTAL_HEADERS_COUNT = 2
const POINT_RADIUS = 3
const N_STEPS = 4
const TITLE_VERTICAL_MARGIN = 15
const SHAPE_STROKE_WIDTH = 2
const AXE_STROKE_WIDTH = .5
const CIRCLE_STROKE_WIDTH = .3
const LABELS_MULTIPLIER_FACTOR = 1.05

// Constants used to move scales.
const MAX_MULTPLIER_FACTOR = 1.05
const MIN_MULTIPLIER_FACTOR = 0.8

// Possible steps used for viz.
const STEP_CHOICES = [.1, .2, .5, 1, 2, 5, 10, 20, 50, 100]

export function setScale(stepChoice, minValue) {
    var maxValue = minValue + N_STEPS * STEP_CHOICES[stepChoice]
    return d3.scaleLinear()
        .domain([minValue, maxValue])
        .range([0, 1])
}

export function setMins(data, attribute) {
    var values = []
    data.forEach(serie => {
        values.push(serie[attribute])
    });

    return MIN_MULTIPLIER_FACTOR * d3.min(values)
}

export function setSteps(data, attribute) {
    var values = []
    data.forEach(serie => {
        values.push(serie[attribute])
    });

    var minValue = MIN_MULTIPLIER_FACTOR * d3.min(values)
    var maxValue = MAX_MULTPLIER_FACTOR * d3.max(values)

    var difference = maxValue - minValue
    for (var i in [...Array(STEP_CHOICES.length).keys()]) {
        if (difference <= STEP_CHOICES[i] * N_STEPS)
            return i
    }
}

export function drawSteps() {

}

export function drawPoints(data, element, xCenter, yCenter, scales) {
    var stats = getStats(data)
    var points = getCoordinates(stats, scales, xCenter, yCenter)

    element.append('g')
        .attr('class', 'points')
        .selectAll('circle')
        .data(points)
        .enter()
        .append('circle')
        .attr('cx', function(d) { return d.x })
        .attr('cy', function(d) { return d.y })
        .attr('r', POINT_RADIUS)
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
        .attr('x2', function(_, i) { return xCenter * (1 - Math.sin(i * 2 * Math.PI / totalAxes)); })
        .attr('y2', function(_, i) { return yCenter * (1 - Math.cos(i * 2 * Math.PI / totalAxes)); })
        .attr('stroke', 'black')
        .attr('stroke-width', AXE_STROKE_WIDTH + 'px')
}

export function drawAxesLabel(data, element, xCenter, yCenter) {
    var stats = getStats(data)

    // Build array containing labels.
    var labels = Object.keys(stats)
    var totalAxes = labels.length

    element.append('g')
        .attr('class', 'labels')
        .selectAll('text')
        .data(labels)
        .enter()
        .append('text')
        .attr('x', function(_, i) { return xCenter * (1 - LABELS_MULTIPLIER_FACTOR * Math.sin(i * 2 * Math.PI / totalAxes)); })
        .attr('y', function(_, i) { return yCenter * (1 - LABELS_MULTIPLIER_FACTOR * Math.cos(i * 2 * Math.PI / totalAxes)); })
        .attr('text-anchor', 'middle')
        .text(function(d) { return d; })
}

export function drawCircles(stepChoices, mins, scales, element, xCenter, yCenter) {
    var nCircles = [...Array(N_STEPS).keys()]
    var radiuses = []

    var label = Object.keys(mins)[0]
    var minValue = mins[label]

    nCircles.forEach((i) => {
        var value = minValue + i * STEP_CHOICES[stepChoices[label]]
        console.log(stepChoices)
        var radius = yCenter * (1 - scales[label](value))
        console.log(radius)
        radiuses.push(radius)
    })

    element.append('g')
        .attr('class', 'circles')
        .selectAll('circle')
        .data(radiuses)
        .enter()
        .append('circle')
        .attr('cx', xCenter)
        .attr('cy', yCenter)
        .attr('r', function(d) { return d; })
        .attr('fill', 'transparent')
        .attr('stroke-width', CIRCLE_STROKE_WIDTH + 'px')
        .attr('stroke', 'black')
        .style('stroke-dasharray', ('4, 2'))
}

export function drawShape(data, element, xCenter, yCenter, scales) {
    var stats = getStats(data)
    var points = getCoordinates(stats, scales, xCenter, yCenter)

    var strPolygon = ''
    points.forEach((point) => {
        strPolygon += (point.x + ',' + point.y + ' ')
    })

    element.select('.points')
        .append('polygon')
        .attr('points', strPolygon)
        .attr('fill', 'transparent')
        .attr('stroke-width', SHAPE_STROKE_WIDTH + 'px')
        .attr('stroke', 'black')
}

export function drawTitle(data, element, xCenter) {
    element.append('text')
        .text(data.Season)
        .attr('x', xCenter)
        .attr('y', -TITLE_VERTICAL_MARGIN)
        .attr('text-anchor', 'middle')
        .style('color', 'black')
        .style('font-size', '12px')
}

export function getStats(data) {
    // Removes unnecessary labels.
    var stats = Object.assign({}, data)
    delete stats.Team
    delete stats.Season

    return stats
}

export function getCoordinates(stats, scales, xCenter, yCenter) {
    var points = []
    var keys = Object.keys(stats)
    var totalAxes = keys.length

    keys.forEach(function(d, i) {
        var x = xCenter * (1 - scales[d](stats[d]) * Math.sin(i * 2 * Math.PI / totalAxes))
        var y = yCenter * (1 - scales[d](stats[d]) * Math.cos(i * 2 * Math.PI / totalAxes))
        points.push({'x': x, 'y': y})
    })

    return points
}

export function eraseAll(element) {
    element.selectAll('*').remove()
}