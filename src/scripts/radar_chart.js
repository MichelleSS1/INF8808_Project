// Constants used for style.
const TOTAL_HEADERS_COUNT = 2
const POINT_SMALL_RADIUS = 3
const POINT_LARGE_RADIUS = 5
const N_STEPS = 4
const TITLE_VERTICAL_MARGIN = 35
const TITLE_FONT_SIZE = 17
const STEP_OPACITY = 0.5
const STEP_FONT_SIZE = 10
const LABELS_FONT_SIZE = 13
const SHAPE_SMALL_STROKE_WIDTH = 2
const SHAPE_LARGE_STROKE_WIDTH = 3
const AXE_STROKE_WIDTH = .5
const TICK_STROKE_WIDTH = .3
const LABELS_MULTIPLIER_FACTOR = 1.05
const BACKGROUND_COLOR = 'white'

// Constants used to move scales.
const MAX_MULTPLIER_FACTOR = 1.2
const MIN_MULTIPLIER_FACTOR = 0.9
const XGA_MULTIPLIER_FACTOR = 1.1

// Possible steps used for viz.
const STEP_CHOICES = [.1, .2, .5, 1, 2, 5, 10, 20, 50, 100]


/**
 * Reads data and sets scales for radar charts.
 *
 * @param { Number } stepChoice Index of the step to choose.
 * @param { Number } minValue Value of the minimum.
 */
export function setScale(stepChoice, minValue) {
    var maxValue = minValue + N_STEPS * STEP_CHOICES[stepChoice]
    return d3.scaleLinear()
        .domain([minValue, maxValue])
        .range([0, 1])
}


/**
 * Returns the closest 'round' value of given number.
 *
 * @param { Number } value Given number.
 * @param { isBefore } isBefore Boolean that indicates if it returns the closest value before or after.
 */
function getClosestStepToValue(value, isBefore) {
    for (var i in STEP_CHOICES) {
        if (value <= STEP_CHOICES[i])
            return isBefore ? STEP_CHOICES[i - 1] : STEP_CHOICES[i]
    }
}


/**
 * Reads data and computes the smallest value in the visualisation.
 *
 * @param { Array } data Given data.
 * @param { String } attribute Attribute for which it computes the minimum value.
 */
export function getMin(data, attribute) {
    var values = []
    data.forEach(serie => {
        values.push(serie[attribute])
    });
    if (attribute !== 'xGA') {
        var tempMin = MIN_MULTIPLIER_FACTOR * d3.min(values)
        return getClosestStepToValue(tempMin, true)
    } else {
        var tempMin = XGA_MULTIPLIER_FACTOR * d3.min(values)
        return - getClosestStepToValue(Math.abs(tempMin), false)
    }
}


/**
 * Reads data and computes the best choice for steps for the visualisation.
 *
 * @param { Array } data Given data.
 * @param { String } attribute Attribute for which it computes the best choice.
 */
export function setSteps(data, attribute) {
    var values = []
    data.forEach(serie => {
        values.push(serie[attribute])
    });

    if (attribute !== 'xGA') {
        var tempMin = MIN_MULTIPLIER_FACTOR * d3.min(values)
        var minValue = getClosestStepToValue(tempMin, true)
    } else {
        var tempMin = XGA_MULTIPLIER_FACTOR * d3.min(values)
        minValue = - getClosestStepToValue(Math.abs(tempMin), false)
    }
    var maxValue = MAX_MULTPLIER_FACTOR * d3.max(values)

    var difference = maxValue - minValue
    for (var i in [...Array(STEP_CHOICES.length).keys()]) {
        if (difference < STEP_CHOICES[i] * N_STEPS)
            return (attribute !== 'xGA') ? i : parseFloat(i) + 1
    }
}


/**
 * Draws value of each tick in the visualisation.
 * Reference for x and y attributes: http://bl.ocks.org/chrisrzhou/2421ac6541b68c1680f8
 *
 * @param { Array } stepChoices Choices of step value for each attribute.
 * @param { Array } mins Minimum values of each attribute.
 * @param { Array } scales Scaling function for each attribute.
 * @param { SVGElement } element SVG element that contains the nodes for steps.
 * @param { Number } xCenter X coordinate of the center of the chart.
 * @param { Number } yCenter Y coordinate of the center of the chart.
 */
export function drawSteps(stepChoices, mins, scales, element, xCenter, yCenter) {
    var nCircles = [...Array(N_STEPS - 1).keys()].map(i => i + 1)
    var labels = Object.keys(mins)
    var totalAxes = labels.length
    var stepContainer = element.append('g')

    // Adds text for each step of each category.
    nCircles.forEach(function(d) {
        labels.forEach(function(label, i) {
            var stepValue = mins[label] + d * STEP_CHOICES[stepChoices[label]].toFixed(2)
            stepContainer.append('text')
                .attr('x', xCenter * (1 - scales[label](stepValue) * Math.sin(i * 2 * Math.PI / totalAxes)))
                .attr('y', yCenter * (1 - scales[label](stepValue) * Math.cos(i * 2 * Math.PI / totalAxes)))
                .text(Math.abs(stepValue))
                .attr('text-anchor', 'middle')
                .attr('alignment-baseline', 'middle')
                .attr('opacity', STEP_OPACITY)
                .style('font-size', STEP_FONT_SIZE + 'px')
                .attr('class', 'steps')
        })
    })

    // Gets bounding boxes of each text element.
    var nodes = []
    stepContainer.selectAll('.steps')
        .each(function(d) {
            nodes.push(d3.select(this).node().getBBox())
        })

    // Adds background rectangle to each text element.
    stepContainer
        .selectAll('rect')
        .data(nodes)
        .enter()
        .insert('rect', ':first-child')
        .attr('x', function(d) { return d.x })
        .attr('y', function(d) { return d.y })
        .attr('width', function(d) { return d.width })
        .attr('height', function(d) { return d.height })
        .attr('fill', BACKGROUND_COLOR)
}


/**
 * Draws value of each tick in the visualisation.
 * Reference for x and y attributes: http://bl.ocks.org/chrisrzhou/2421ac6541b68c1680f8
 *
 * @param { Array } stepChoices Choices of step value for each attribute.
 * @param { Array } mins Minimum values of each attribute.
 * @param { Array } scales Scaling function for each attribute.
 * @param { SVGElement } element SVG element that contains the nodes for steps.
 * @param { Number } xCenter X coordinate of the center of the chart.
 * @param { Number } yCenter Y coordinate of the center of the chart.
 */
export function drawPoints(data, element, xCenter, yCenter, scales, colour) {
    var stats = getStats(data)
    var points = getCoordinates(stats, scales, xCenter, yCenter)

    element.append('g')
        .attr('class', 'points')
        .attr('id', colour)
        .selectAll('circle')
        .data(points)
        .enter()
        .append('circle')
        .attr('cx', function(d) { return d.x })
        .attr('cy', function(d) { return d.y })
        .attr('r', POINT_SMALL_RADIUS)
        .attr('fill', colour)
        .on("mouseover", function(d) { 
            d3.select(this).style('r', POINT_LARGE_RADIUS + 'px')
         })
        .on("mouseout", function() {
            d3.select(this).style('r', POINT_SMALL_RADIUS + 'px')
        })
}       


/**
 * Draws axes of each category.
 * Reference for x and y attributes: http://bl.ocks.org/chrisrzhou/2421ac6541b68c1680f8
 *
 * @param { Array } data Given data. 
 * @param { SVGElement } element SVG element that contains the nodes for steps.
 * @param { Number } xCenter X coordinate of the center of the chart.
 * @param { Number } yCenter Y coordinate of the center of the chart.
 */
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


/**
 * Draws title of each axis.
 * Reference for x and y attributes: http://bl.ocks.org/chrisrzhou/2421ac6541b68c1680f8
 *
 * @param { Array } data Given data. 
 * @param { SVGElement } element SVG element that contains the nodes for steps.
 * @param { Number } xCenter X coordinate of the center of the chart.
 * @param { Number } yCenter Y coordinate of the center of the chart.
 */
export function drawAxesLabel(data, element, xCenter, yCenter, tip) {
    var stats = getStats(data)
    // Build array containing labels.
    var labels = Object.keys(stats)
    var totalAxes = labels.length
    var container = element.append('g')

    container
        .selectAll('text')
        .data(data)
        .enter()
        .append('text')
        .attr('class', 'label')
        .attr('x', function(_, i) { return xCenter * (1 - LABELS_MULTIPLIER_FACTOR * Math.sin(i * 2 * Math.PI / totalAxes)); })
        .attr('y', function(_, i) { return yCenter * (1 - LABELS_MULTIPLIER_FACTOR * Math.cos(i * 2 * Math.PI / totalAxes)); })
        .attr('text-anchor', 'middle')
        .on("mouseover", function(d) { 
            tip.show(d,this)
            d3.select(this)
            .style('font-size', 16 + 'px')
         })
        .on("mouseout", function() {
            tip.hide()
            d3.select(this).style('font-size', LABELS_FONT_SIZE + 'px')
        })
        .style('font-size', LABELS_FONT_SIZE + 'px')
        .style('font-weight', 'bold')
        .text(function(d) {return d.label; })

    var nodes = []
    container.selectAll('.label')
        .each(function(d) {
            nodes.push(d3.select(this).node().getBBox())
        })

    container
        .selectAll('rect')
        .data(nodes)
        .enter()
        .insert('rect', ':first-child')
        .attr('x', function(d) { return d.x })
        .attr('y', function(d) { return d.y })
        .attr('width', function(d) { return d.width })
        .attr('height', function(d) { return d.height })
        .attr('fill', BACKGROUND_COLOR)
}


/**
 * Draws intermediate polygons across steps.
 * Reference for x and y attributes: http://bl.ocks.org/chrisrzhou/2421ac6541b68c1680f8
 *
 * @param { Array } stepChoices Choices of step value for each attribute.
 * @param { Array } mins Minimum values of each attribute.
 * @param { Array } scales Scaling function for each attribute.
 * @param { SVGElement } element SVG element that contains the nodes for steps.
 * @param { Number } xCenter X coordinate of the center of the chart.
 * @param { Number } yCenter Y coordinate of the center of the chart.
 */
export function drawTicks(stepChoices, mins, scales, element, xCenter, yCenter) {
    var nTicks = [...Array(N_STEPS - 1).keys()].map(i => i + 1)
    var labels = Object.keys(mins)
    var totalAxes = labels.length

    var ticksContainer = element.append('g')
        .attr('class', 'ticks')

    nTicks.forEach(function(d) {
        var strPolygon = ''
        labels.forEach((label, i) => {
            var stepValue = mins[label] + d * STEP_CHOICES[stepChoices[label]].toFixed(2)
            var x = xCenter * (1 - scales[label](stepValue) * Math.sin(i * 2 * Math.PI / totalAxes))
            var y = yCenter * (1 - scales[label](stepValue) * Math.cos(i * 2 * Math.PI / totalAxes))
            strPolygon += (x + ',' + y + ' ')
        })

        ticksContainer.append('polygon')
            .attr('points', strPolygon)
            .attr('fill', 'transparent')
            .attr('stroke-width', TICK_STROKE_WIDTH + 'px')
            .attr('stroke', 'black') 
            .attr('stroke-dasharray', '4, 1')
    })
}


/**
 * Draws polygon that connects points on visualisation.
 *
 * @param { Array } data Given data.
 * @param { SVGElement } element SVG element that contains the nodes for steps.
 * @param { Number } xCenter X coordinate of the center of the chart.
 * @param { Number } yCenter Y coordinate of the center of the chart.
 * @param { Array } scales Scaling function for each attribute.
 * @param { String } colour Colour of the polygon.
 */
export function drawShape(data, element, xCenter, yCenter, scales, colour) {
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
        .attr('stroke-width', SHAPE_SMALL_STROKE_WIDTH + 'px')
        .attr('stroke', colour)
        .on("mouseover", function() { 
            d3.select(this).style('stroke-width', SHAPE_LARGE_STROKE_WIDTH + 'px')
         })
        .on("mouseout", function() {
            d3.select(this).style('stroke-width', SHAPE_SMALL_STROKE_WIDTH + 'px')
        })
}


/**
 * Draws title of the chart.
 *
 * @param { Array } data Given data.
 * @param { SVGElement } element SVG element that contains the nodes for steps.
 * @param { Number } xCenter X coordinate of the center of the chart.
 */
export function drawTitle(data, element, xCenter) {
    element.append('text')
        .text(data.Season)
        .attr('x', xCenter)
        .attr('y', -TITLE_VERTICAL_MARGIN)
        .attr('text-anchor', 'middle')
        .style('color', 'black')
        .style('font-size', TITLE_FONT_SIZE + 'px')
}


/**
 * Returns raw stats with no team name or season.
 *
 * @param { Array } data Given data.
 */
export function getStats(data) {
    // Removes unnecessary labels.
    var stats = Object.assign({}, data)
    delete stats.Team
    delete stats.Season

    return stats
}


/**
 * Converts values to coordinates.
 * Reference for x and y attributes: http://bl.ocks.org/chrisrzhou/2421ac6541b68c1680f8
 *
 * @param { Array } stats Values of given data.
 * @param { Array } scales Scaling function for each attribute.
 * @param { Number } xCenter X coordinate of the center of the chart.
 * @param { Number } yCenter Y coordinate of the center of the chart.
 */
export function getCoordinates(stats, scales, xCenter, yCenter) {
    var points = []
    var keys = Object.keys(stats)
    var totalAxes = keys.length

    keys.forEach(function(d, i) {
        var val = stats[d]
        var x = xCenter * (1 - scales[d](stats[d]) * Math.sin(i * 2 * Math.PI / totalAxes))
        var y = yCenter * (1 - scales[d](stats[d]) * Math.cos(i * 2 * Math.PI / totalAxes))
        points.push({'val': val, 'x': x, 'y': y})
    })

    return points
}


/**
 * Removes all children nodes in container.
 *
 * @param { SVGElement } element SVG element containing the chart.
 */
export function eraseAll(element) {
    element.selectAll('*').remove()
}
