import * as radarChart from './radar_chart'
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
export function drawOffensiveRadarCharts(data, element, width, height, margin) {
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
        .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')')

    // Build each chart separately.
    data.forEach(function(serie, i) {
        var xTranslation = Math.floor(i / 2) * (width + margin.left + margin.right)
        var chartContainer = container.append('g')
            .attr('transform', 'translate(' + xTranslation + ', 0)')
        if (serie.Team === 'Juventus') {
            radarChart.drawAxes(serie, chartContainer, xCenter, yCenter)
            radarChart.drawAxesLabel(serie, chartContainer, xCenter, yCenter)
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
export function drawDefensiveRadarChart(data, element, width, height, margin) {
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

    console.log(data)

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
        .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')')

    // Build each chart separately.
    data.forEach(function(serie, i) {
        var xTranslation = Math.floor(i / 2) * (width + margin.left + margin.right)
        var chartContainer = container.append('g')
            .attr('transform', 'translate(' + xTranslation + ', 0)')
        if (serie.Team === 'Juventus') {
            radarChart.drawAxes(serie, chartContainer, xCenter, yCenter)
            radarChart.drawAxesLabel(serie, chartContainer, xCenter, yCenter)
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
 export function updateBCXScales(xScale, bxScale, xDomain, xRangeInterval) {
  xScale.domain(xDomain)
  .rangeRound(xRangeInterval);
  
  bxScale.domain(range(0, xDomain.length))
  .rangeRound(xRangeInterval); 
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
export function updateBCYScales(yScale, byScale, yDomain, yRangeInterval) {
  yScale.rangeRound(yRangeInterval);
  
  byScale.domain(range(0, yDomain.length))
  .rangeRound(yRangeInterval); 
}
  
/**
 *  Draws the X axis at the bottom of the diagram.
 *
 *  @param {*} xScale The scale to use to draw the axis
 */
 export function drawBCXAxis (xScale, height) {
  var xAxis = d3.axisBottom()
    .scale(xScale);
  d3.select(".x.axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis)
    .selectAll(".tick text")
    .attr("font-size", "12px");
}

/**
 * Draws the Y axis to the appropriate side of the diagram.
 *
 * @param {*} yScale The scale to use to draw the axis
 * @param {number} width The width of the graphic
 */
export function drawBCYAxis (yScale, leftdomain, rightDoamin, width) {
  var yAxis = d3.axisLeft()
    .scale(yScale.domain(leftdomain));
  d3.select(".y.left-axis")
    .call(yAxis)
    .selectAll(".tick text")
    .attr("font-size", "15px");
    
  yAxis = d3.axisRight()
    .scale(yScale.domain(rightDoamin));
  d3.select(".y.right-axis")
    .attr("transform", "translate(" + width + ",0)")
    .call(yAxis)
    .selectAll(".tick text")
    .attr("font-size", "15px");

  d3.select(".y.left-axis").select(".domain").remove();
  d3.select(".y.right-axis").select(".domain").remove();
}


// function highlight(e, d) {       
//   this.parentNode.appendChild(this);
//   series.filter(s => s !== d)
//     .transition().duration(500)
//     .attr("fill", "#ddd").attr("stroke", "#ddd");
//   markTick(leftY, 0);
//   markTick(rightY,  quarters.length - 1);
  
//   function markTick(axis, pos) {
//     axis.selectAll(".tick text").filter((s, i) => i === d[pos].rank)
//       .transition().duration(500)
//       .attr("font-weight", "bold")
//       .attr("fill", color(d[0].rank));
//   }
// }

// function restore(selection) {
//   selection.transition().duration(500)
//     .attr("fill", s => color(s[0].rank)).attr("stroke", s => color(s[0].rank));    
//   restoreTicks(leftY);
//   restoreTicks(rightY);
  
//   function restoreTicks(axis) {
//     axis.selectAll(".tick text")
//       .transition().duration(500)
//       .attr("font-weight", "normal").attr("fill", "black");
//   }
// }

/**
 * Draws dashed lines on top of the seasons
 * 
 * @param {Array} seasons The seasons
 * @param {*} bxScale The scale for the center of the bumpchart
 * @param {number} height the height of the dashed lines
 */
export function drawBCDashedLines(seasons, bxScale, height, padding) {
  d3.select("#bc-center")
    .selectAll(".dash-line")
    .data(range(0, seasons.length))
    .enter()
    .append("path")
    .attr('class', 'dash-line')
    .attr("stroke", "#ccc")
    .attr("stroke-width", 2)
    .attr("stroke-dasharray", "5,5")
    .attr("d", d => d3.line()([[bxScale(d), padding/2], [bxScale(d), height - padding/2]]));
}

export function drawBCRankingLines(chartData, bxScale, byScale) {
  d3.select("#bc-center").selectAll(".ranking-line")
    .data(chartData)
    .enter()
    .append("path")
    .attr('class', 'ranking-line')
    .attr("stroke-width", "5")
    .attr("d", (d, i) => { 
      console.log(d)
      if (d.next) 
        return d3.line()([[bxScale(i), byScale(d.rank)], [bxScale(i + 1), byScale(d.next.rank)]]);
    });
}
