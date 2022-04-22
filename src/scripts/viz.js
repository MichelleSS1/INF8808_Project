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
        .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')')

    // Build each chart separately.
    data.forEach(function(serie, i) {
        var xTranslation = Math.floor(i / 2) * (width + margin.left + margin.right)
        var chartContainer = container.append('g')
            .attr('transform', 'translate(' + xTranslation + ', 0)')
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
        .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')')

    // Build each chart separately.
    data.forEach(function(serie, i) {
        var xTranslation = Math.floor(i / 2) * (width + margin.left + margin.right)
        var chartContainer = container.append('g')
            .attr('transform', 'translate(' + xTranslation + ', 0)')
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
export function addButtons(svgElement, graphHeight, margin) {
    var toggled = false;
    // Create button for the Juventus radar chart
    var rectBlue = svgElement.append('g')
    rectBlue.append('rect')
    .attr('width', 125)
    .attr('height', 25)
    .attr('transform', 'translate(0, ' + (graphHeight + margin.bottom) + ')')
    .attr('fill', 'grey')
    .attr('stroke', 'black')
    .attr('strke-width', '1px')
    .style('cursor', 'pointer')

    rectBlue.append('text')
    .text('Toggle Juventus')
    .attr('transform', 'translate(0,' + (graphHeight + margin.bottom + 20) + ')')
    .on('click', function() {
      if(svgElement.selectAll('#blue').style('opacity') == 0.15) {
        svgElement.selectAll('#blue')
        .style('opacity', 1);
        toggled = false;
      }else if(!toggled) {
        svgElement.selectAll('#blue')
        .style('opacity', 0.15);
        toggled = true;
      }

    })
    .style('cursor', 'pointer')

    // Create button for the Top 7 radar chart
    var rectOrange = svgElement.append('g')
    rectOrange.append('rect')
    .attr('width', 100)
    .attr('height', 25)
    .attr('transform', 'translate(135,' + (graphHeight + margin.bottom) + ')')
    .attr('fill', 'grey')
    .attr('stroke', 'black')
    .attr('strke-width', '1px')
    .style('cursor', 'pointer')

    rectOrange.append('text')
    .text('Toggle Top 7')
    .attr('transform', 'translate(135,' + (graphHeight + margin.bottom + 20) + ')')
    .on('click', function() {
      if(svgElement.selectAll('#orange').style('opacity') == 0.15) {
        svgElement.selectAll('#orange')
        .style('opacity', 1);
        toggled = false;
      }else if(!toggled) {
        svgElement.selectAll('#orange')
        .style('opacity', 0.15);
        toggled = true;
      }

    })
    .style('cursor', 'pointer')
}

/************************************** V3 - SCATTER PLOT ***********************************/

/**
 * Positions the x axis label and y axis label.
 *
 * @param {*} g The d3 Selection of the graph's g SVG element
 * @param {number} width The width of the graph
 * @param {number} height The height of the graph
 */
 export function positionLabels (g, width, height) {
  g.select('text.y.axis-text')
    .attr('x', width + 50)
    .attr('y', height / 2)
    .style('text-anchor', 'middle')

  g.select('text.x.axis-text')
    .attr('x', width / 2)
    .attr('y', height + 50)
    .style('text-anchor', 'middle')
}

/**
 * Draws the circles on the graph.
 *
 * @param chart
 * @param {object} data The data to bind to
 * @param {*} rScale The scale for the circles' radius
 * @param radius
 * @param {*} colorScale The scale for the circles' color
 * @param xScale
 * @param yScale
 * @param tip
 */
export function drawCircles (chart, data, radius, colorScale, xScale, yScale) {
  // If there are no circles already, we create new circles
  if (chart.selectAll('circle').empty()) {
    chart.selectAll('dot')
      .data(data)
      .enter()
      .append('circle')
      .attr('cx', function (d) { return xScale(parseInt(d.Numero_Match)) })
      .attr('cy', function (d) { return yScale(parseFloat(d.Masse_Salariale)) })
      .attr('r', radius)
      .style('fill', function (d) { return colorScale(d.Resultat) })
      .style('opacity', 1)
      .attr('stroke', 'white')
  }
}

/**
 * @param chart
 * @param data
 * @param colorScale
 * @param result
 * @param xScale
 * @param yScale
 */
export function drawDensityLine (chart, data, colorScale, result, xScale, yScale) {
  var points = []
  var salaireMin = d3.min(data, function (d) { return Math.floor(parseFloat(d.Masse_Salariale)) })
  var salaireMax = d3.max(data, function (d) { return Math.ceil(parseFloat(d.Masse_Salariale)) })

  const pas = Math.round((salaireMax - salaireMin) / 15)
  var salaireInf = salaireMin
  var salaireSup = salaireInf + pas
  while (salaireSup < salaireMax) {
    var countResults = 0
    data.forEach((line) => {
      if (line.Resultat === result && line.Masse_Salariale >= salaireInf && (line.Masse_Salariale < salaireSup || line.Masse_Salariale === salaireMax)) {
        countResults = countResults + 1
      }
    })
    points.push([xScale(countResults), yScale((salaireInf + pas / 2))])
    salaireInf = salaireSup
    salaireSup = salaireInf + pas
  }

  const curve = d3.line().curve(d3.curveNatural)
  chart.append('path')
    .attr('d', curve(points))
    .attr('stroke', colorScale(result))
    .attr('fill', 'none')
  chart.node()
}

/**
 * Update the title of the graph.
 *
 * @param {number} year The currently displayed year
 */
export function setTitleText () {
  d3.select('#bubble-chart1')
    .select('#graph-g1')
    .select('text.title')
    .text('Saison : 2019-2020')
    .style('text-anchor', 'middle')

  d3.select('#bubble-chart2')
    .select('#graph-g2')
    .select('text.title')
    .text('Saison : 2020-2021')
    .style('text-anchor', 'middle')

  d3.select('#bubble-chart3')
    .select('#graph-g3')
    .select('text.title')
    .text('Saison : 2021-2022')
    .style('text-anchor', 'middle')
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
  
  byScale.domain(range(1, yDomain.length + 1))
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
  var yLeftAxis = d3.axisLeft()
    .scale(yScale.domain(leftdomain));
  d3.select(".y.left-axis")
    .call(yLeftAxis)
    .selectAll(".tick text")
    .attr("font-size", "15px");
    
  var yRightAxis = d3.axisRight()
    .scale(yScale.domain(rightDoamin));
  d3.select(".y.right-axis")
    .attr("transform", "translate(" + width + ",0)")
    .call(yRightAxis)
    .selectAll(".tick text")
    .attr("font-size", "15px");

  d3.select(".y.left-axis").select(".domain").remove();
  d3.select(".y.right-axis").select(".domain").remove();
}

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

/**
 * Draws dashed lines on top of the seasons
 * 
 * @param {*} bxScale The scale for the center of the bumpchart
 * @param {*} byScale The scale for the y pos in the bumpchart
 */
 export function drawBCRankingLines(bxScale, byScale) {
  d3.selectAll(".series")
    .selectAll(".ranking-line")
    .data(d => d)
    .enter()
    .append("path")
    .attr('class', 'ranking-line')
    .attr("stroke-width", "5")
    .attr("d", (d, i) => { 
      if (d.next) 
        return d3.line()([[bxScale(i), byScale(d.rank)], [bxScale(i + 1), byScale(d.next.rank)]]);
    });
}

/**
 * Draws dashed lines on top of the seasons
 * 
 * @param {*} bxScale The scale for the center of the bumpchart
 * @param {*} byScale The scale for the y pos in the bumpchart
 * @param {*} bumpRadius the radius of bumps
 */
 export function drawBCBumpNumber(bxScale, byScale, bumpRadius){
  const bumps = d3.selectAll(".series")
    .selectAll("g")
    .data(d => d)
    .enter()
    .append("g")
    .attr("class", "bump")
    .attr("transform", (d, i) => `translate(${bxScale(i)},${byScale(d.rank)})`)
    .call(g => g.append("title").text((d, i) => `${d.team} - ${d.season}\nPoints: ${d.pts == 0 ? "check for updates" : d.pts}`)); 

  bumps.append("circle")
    .attr("r", bumpRadius);

  bumps.append("text")
    .attr("dy", "0.35em")
    .attr("fill", "white")
    .attr("stroke", "none")
    .attr("text-anchor", "middle")    
    .style("font-weight", "bold")
    .style("font-size", "14px")
    .text(d => d.rank);
}