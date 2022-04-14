import * as radarChart from './radar_chart'
import * as preproc from './preprocess.js'
import { range } from "./util";


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
    console.log(labels)
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
            radarChart.drawPoints(serie, chartContainer, xCenter, yCenter, scales, 'blue')
            radarChart.drawShape(serie, chartContainer, xCenter, yCenter, scales, 'blue')
        } else {
            radarChart.drawPoints(serie, chartContainer, xCenter, yCenter, scales, 'orange')
            radarChart.drawShape(serie, chartContainer, xCenter, yCenter, scales, 'orange')
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
    console.log(labels)

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
            radarChart.drawPoints(serie, chartContainer, xCenter, yCenter, scales, 'blue')
            radarChart.drawShape(serie, chartContainer, xCenter, yCenter, scales, 'blue')
        } else {
            radarChart.drawPoints(serie, chartContainer, xCenter, yCenter, scales, 'orange')
            radarChart.drawShape(serie, chartContainer, xCenter, yCenter, scales, 'orange')
        }
    });
}

/**
 * Adds the toggle buttons for each vizualiasation.
 * 
 * @param { SVGElement } svgElement The SVG element where the radar chart will be built.
 */
export function addButtons(svgElement) {

    // Create button for the Juventus radar chart
    var rectBlue = svgElement.append('g')
    rectBlue.append('rect')
    .attr('width', 125)
    .attr('height', 25)
    .attr('transform', 'translate(0,510)')
    .attr('fill', 'grey')
    .attr('stroke', 'black')
    .attr('strke-width', '1px')
    .style('cursor', 'pointer')

    rectBlue.append('text')
    .text('Toggle Juventus')
    .attr('transform', 'translate(0,526)')
    .on('click', function() {
      if(svgElement.selectAll('#blue').style('opacity') == 0.15) {
        svgElement.selectAll('#blue')
        .style('opacity', 1)
      }else {
        svgElement.selectAll('#blue')
        .style('opacity', 0.15)
      }

    })
    .style('cursor', 'pointer')

    // Create button for the Top 7 radar chart
    var rectOrange = svgElement.append('g')
    rectOrange.append('rect')
    .attr('width', 100)
    .attr('height', 25)
    .attr('transform', 'translate(135,510)')
    .attr('fill', 'grey')
    .attr('stroke', 'black')
    .attr('strke-width', '1px')
    .style('cursor', 'pointer')

    rectOrange.append('text')
    .text('Toggle Top 7')
    .attr('transform', 'translate(135,526)')
    .on('click', function() {
      if(svgElement.selectAll('#orange').style('opacity') == 0.15) {
        svgElement.selectAll('#orange')
        .style('opacity', 1)
      }else {
        svgElement.selectAll('#orange')
        .style('opacity', 0.15)
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
  
