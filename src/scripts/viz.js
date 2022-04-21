import * as radarChart from './radar_chart'
import * as preproc from './preprocess.js'
import { range } from "./util";

/*********************************** CONSTANTS USED FOR STYLE **********************************/
const JUVENTUS_COLOR = 'blue'
const TOP_7_COLOR = 'orange'
const BUTTON_JUVENTUS_WIDTH = 125
const BUTTON_TOP_7_WIDTH = 100
const BUTTON_HEIGHT = 25
const BUTTON_BACKGROUND_COLOR = 'grey'
const LOW_OPACITY = 0.15


/************************************** V1/2 - RADAR CHART *************************************/

/**
 * Calls the functions from radar_chart.js to build the radar
 * chart of the offensive stats.
 *
 * @param { Array } data The data used to build the radar chart.
 * @param { SVGElement } element The SVG element where the radar chart will be built.
 * @param { Number } width The width of the SVG tag.
 * @param { Number } height The height of the SVG tag.
 * @param { Object } margin The margins between the container and the SVG space.
 */
export function drawOffensiveRadarCharts(data, element, width, height, margin, tip) {
    var xCenter = width / 2
    var yCenter = height / 2

    // Erases charts so they can be rebuilt.
    radarChart.eraseAll(element)

    // Prepares scales, steps and mins.
    var scales = {}
    var steps = {}
    var mins = {}
    var stats = radarChart.getStats(data[0])
    var labels = Object.keys(stats)
    var descriptions = Object.values(stats)
    var tooltips = preproc.preprocessTooltipOff(labels, descriptions)
    data = data.slice(1,data.length)
    labels.forEach(function(label) {
        var min = radarChart.getMin(data, label)
        mins[label] = min
        var stepChoice = radarChart.setSteps(data, label, min)
        steps[label] = stepChoice
        var scale = radarChart.setScale(stepChoice, min)
        scales[label] = scale
    })

    // Build container for charts.
    var container = element.append('g')
        .attr('transform', 'translate(' + margin.left + ' ' + margin.top + ')')

    // Build each chart separately.
    data.forEach(function(serie, i) {
        var xTranslation = Math.floor(i / 2) * (width + margin.left + margin.right)
        var chartContainer = container.append('g')
            .attr('transform', 'translate(' + xTranslation + ' 0)')
        if (serie.Team === 'Juventus') {
            radarChart.drawAxes(serie, chartContainer, xCenter, yCenter)
            radarChart.drawAxesLabel(tooltips, chartContainer, xCenter, yCenter, tip)
            radarChart.drawTicks(steps, mins, scales, chartContainer, xCenter, yCenter)
            radarChart.drawSteps(steps, mins, scales, chartContainer, xCenter, yCenter)
            radarChart.drawTitle(serie, chartContainer, xCenter)
            radarChart.drawPoints(serie, chartContainer, xCenter, yCenter, scales, JUVENTUS_COLOR)
            radarChart.drawShape(serie, chartContainer, xCenter, yCenter, scales, JUVENTUS_COLOR)
        } else {
            radarChart.drawPoints(serie, chartContainer, xCenter, yCenter, scales, TOP_7_COLOR)
            radarChart.drawShape(serie, chartContainer, xCenter, yCenter, scales, TOP_7_COLOR)
        }
    });
}

/**
 * Calls the functions from radar_chart.js to build the radar
 * chart of the defensive stats.
 *
 * @param { Array } data The data used to build the radar chart.
 * @param { SVGElement } element The SVG element where the radar chart will be built.
 * @param { Number } width The width of the SVG tag.
 * @param { Number } height The height of the SVG tag.
 * @param { Object } margin The margins between the container and the SVG space.
 */
export function drawDefensiveRadarChart(data, element, width, height, margin, tip) {
    var xCenter = width / 2
    var yCenter = height / 2

    // Erases charts so they can be rebuilt.
    radarChart.eraseAll(element)

    // Prepares scales, steps and mins.
    var scales = {}
    var steps = {}
    var mins = {}
    var stats = radarChart.getStats(data[0])
    var labels = Object.keys(stats)
    var descriptions = Object.values(stats)
    var tooltips = preproc.preprocessTooltipDef(labels, descriptions)
    data = data.slice(1,data.length)

    labels.forEach(function(label) {
        var min = radarChart.getMin(data, label)
        mins[label] = min
        var stepChoice = radarChart.setSteps(data, label, min)
        steps[label] = stepChoice
        var scale = radarChart.setScale(stepChoice, min)
        scales[label] = scale
    })

    // Build container for charts.
    var container = element.append('g')
        .attr('transform', 'translate(' + margin.left + ' ' + margin.top + ')')

    // Build each chart separately.
    data.forEach(function(serie, i) {
        var xTranslation = Math.floor(i / 2) * (width + margin.left + margin.right)
        var chartContainer = container.append('g')
            .attr('transform', 'translate(' + xTranslation + ' 0)')
        if (serie.Team === 'Juventus') {
            radarChart.drawAxes(serie, chartContainer, xCenter, yCenter)
            radarChart.drawAxesLabel(tooltips, chartContainer, xCenter, yCenter, tip)
            radarChart.drawTicks(steps, mins, scales, chartContainer, xCenter, yCenter)
            radarChart.drawSteps(steps, mins, scales, chartContainer, xCenter, yCenter)
            radarChart.drawTitle(serie, chartContainer, xCenter)
            radarChart.drawPoints(serie, chartContainer, xCenter, yCenter, scales, JUVENTUS_COLOR)
            radarChart.drawShape(serie, chartContainer, xCenter, yCenter, scales, JUVENTUS_COLOR)
        } else {
            radarChart.drawPoints(serie, chartContainer, xCenter, yCenter, scales, TOP_7_COLOR)
            radarChart.drawShape(serie, chartContainer, xCenter, yCenter, scales, TOP_7_COLOR)
        }
    });
}

/**
 * Adds the toggle buttons for each vizualiasation.
 * 
 * @param { SVGElement } svgElement The SVG element where the radar chart will be built.
 */
export function addButtons(svgElement, graphHeight, margin) {
    // Create button for the Juventus radar chart
    var rectBlue = svgElement.append('g')
    rectBlue.append('rect')
    .attr('width', BUTTON_JUVENTUS_WIDTH)
    .attr('height', BUTTON_HEIGHT)
    .attr('transform', 'translate(0, ' + (graphHeight + margin.bottom) + ')')
    .attr('fill', BUTTON_BACKGROUND_COLOR)
    .attr('stroke', 'black')
    .attr('strke-width', '1px')
    .style('cursor', 'pointer')

    rectBlue.append('text')
    .text('Toggle Juventus')
    .attr('transform', 'translate(0,' + (graphHeight + margin.bottom + 20) + ')')
    .on('click', function() {
      if(svgElement.selectAll('#blue').style('opacity') == LOW_OPACITY) {
        svgElement.selectAll('#blue')
        .style('opacity', 1)
      } else {
        svgElement.selectAll('#blue')
        .style('opacity', LOW_OPACITY)
      }

    })
    .style('cursor', 'pointer')

    // Create button for the Top 7 radar chart
    var rectOrange = svgElement.append('g')
    rectOrange.append('rect')
    .attr('width', BUTTON_TOP_7_WIDTH)
    .attr('height', BUTTON_HEIGHT)
    .attr('transform', 'translate(135,' + (graphHeight + margin.bottom) + ')')
    .attr('fill', 'grey')
    .attr('stroke', 'black')
    .attr('strke-width', '1px')
    .style('cursor', 'pointer')

    rectOrange.append('text')
    .text('Toggle Top 7')
    .attr('transform', 'translate(135,' + (graphHeight + margin.bottom + 20) + ')')
    .on('click', function() {
      if(svgElement.selectAll('#orange').style('opacity') == LOW_OPACITY) {
        svgElement.selectAll('#orange')
        .style('opacity', 1)
      } else {
        svgElement.selectAll('#orange')
        .style('opacity', LOW_OPACITY)
      }

    })
    .style('cursor', 'pointer')
}

/************************************** V4 - BUMP CHART *************************************/

/**
 * Updates the domain and range of the scale for both x axis
 *
 * @param {*} xScale The scale for the x axis
 * @param {*} bxScale The scale for the x pos in the bumpchart
 * @param {Array} xDomain The seasons
 * @param {Array} xRangeInterval The range interval for the x axis
 * @param {Array} bxRangeInterval The range interval for the x pos in the bumpchart
 */
 export function updateXScales(xScale, bxScale, xDomain, xRangeInterval, bxRangeInterval) {
  xScale.domain(xDomain)
  .rangeRound(xRangeInterval);
  
  bxScale.domain(range(0, xDomain.length))
  .range(bxRangeInterval); 
}

/**
 * Updates the domain and range of the scale for both y axis
 *
 * @param {*} yScale The scale for the y axis
 * @param {*} byScale The scale for the y pos in the bumpchart
 * @param {Array} yDomain Teams names
 * @param {Array} xRangeInterval The range interval for the y axis
 * @param {Array} bxRangeInterval The range interval for the y pos in the bumpchart
 */
export function updateYScales(yScale, byScale, yDomain, yRangeInterval, byRangeInterval) {
  yScale.domain(yDomain)
  .rangeRound(yRangeInterval);
  
  byScale.domain(range(0, yDomain.length))
  .range(byRangeInterval); 
}
  
