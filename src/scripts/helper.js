/**
 * Sets the size of the SVG canvas containing the graph.
 *
 * @param {Object} selection The d3 selection for which to set size
 * @param {number} width The desired width
 * @param {number} height The desired height
 */
 export function setCanvasSize (selection, width, height) {
  selection.attr('width', width)
    .attr('height', height)
}

/********************************* V4 - BUMP CHART *******************************/
/**
 * Generates the SVG element g which will contain the data visualisation.
 *
 * @param {object} margin The desired margins around the graph
 * @returns {*} The d3 Selection for the created g element
 */
 export function generateBCMainG(margin) {
  return d3.select('#chart-rank')
    .select('svg')
    .append('g')
    .attr('id', 'chart-rank-g')
    .attr('transform',
      'translate(' + margin.left + ',' + margin.top + ')')
}

/**
 * Appends an SVG g element which will contain the center of the bumpchart.
 *
 * @param {*} g The d3 Selection of the graph's main g SVG element
 */
 export function appendBCCenter (g) {
  return g.append('g')
    .attr('id', 'bc-center');
}

/**
 * Appends an SVG g element which will contain the axes.
 *
 * @param {*} g The d3 Selection of the graph's g SVG element
 */
 export function appendBCAxes (g) {
  g.append('g')
    .attr('class', 'x axis')

  g.append('g')
    .attr('class', 'y left-axis')

  g.append('g')
    .attr('class', 'y right-axis')
}

export function appendBCTeamSeries(chartData, juveIdx) {
  d3.select("#bc-center")
    .selectAll(".series")
    .data(chartData)
    .enter()
    .append("g")
    .attr("class", (d,i) => i == juveIdx ? "series juve" : "series")
    .transition()
    .duration(2000)
    .attr("opacity", 1)
    .attr("fill", function(d, i) { return i == juveIdx ? "gold" : "gray"})
    .attr("stroke", function(d, i) { return i == juveIdx ? "gold" : "gray"})
}




/********************************* V3 - SCATTER PLOT *******************************/


/**
 * Generates the SVG element g which will contain the data visualisation.
 *
 * @param {object} margin The desired margins around the graph
 * @returns {*} The d3 Selection for the created g element
 */
 export function generateSPG1 (margin) {
  return d3.select('#chart-eff-svg1')
    .append('g')
    .attr('id', 'graph-g1')
    .attr('transform',
      'translate(' + margin.left + ',' + margin.top + ')')
}

/**
 * @param margin
 * @returns {*} The d3 Selection for the created g element
 */
export function generateSPG2 (margin) {
  return d3.select('#chart-eff-svg2')
    .append('g')
    .attr('id', 'graph-g2')
    .attr('transform',
      'translate(' + margin.left + ',' + margin.top + ')')
}

/**
 * @param margin
 * @returns {*} The d3 Selection for the created g element
 */
export function generateSPG3 (margin) {
  return d3.select('#chart-eff-svg3')
    .append('g')
    .attr('id', 'graph-g3')
    .attr('transform',
      'translate(' + margin.left + ',' + margin.top + ')')
}

/**
 * Appends an SVG g element which will contain the axes.
 *
 * @param {*} g The d3 Selection of the graph's g SVG element
 */
export function appendSPAxes1 (g) {
  g.append('g')
    .attr('class', 'x1 axis')

  g.append('g')
    .attr('class', 'y1 axis')
}

/**
 * @param g
 */
export function appendSPAxes2 (g) {
  g.append('g')
    .attr('class', 'x2 axis')

  g.append('g')
    .attr('class', 'y2 axis')
}

/**
 * @param g
 */
export function appendSPAxes3 (g) {
  g.append('g')
    .attr('class', 'x3 axis')

  g.append('g')
    .attr('class', 'y3 axis')
}
/**
 * Appends the labels for the y axis and the title of the graph.
 *
 * @param {*} g The d3 Selection of the graph's g SVG element
 * @param width
 */
export function appendSPGraphLabels (g, width) {
  g.append('text')
    .text("Masse salariale (millions d'euros)")
    .attr('class', 'y axis-text')
    .attr('transform', 'translate(' + 0 + ',' + -15 + ')')
    .attr('font-size', 12)
    
  g.append('text')
    .text('Numéro de match')
    .attr('class', 'x axis-text')
    .attr('font-size', 12)
}

/**
 * Draws the X axis at the bottom of the diagram.
 *
 * @param axis
 * @param {*} xScale The scale to use to draw the axis
 * @param {number} height The height of the graphic
 */
export function drawSPXAxis (axis, xScale, height) {
  axis.attr('transform', 'translate( 0, ' + height + ')')
    .call(d3.axisBottom(xScale).tickSizeOuter(0).tickArguments([20, '~s']))
}


/**
 * Draws the Y axis to the right of the diagram.
 *
 * @param axis
 * @param {*} yScale The scale to use to draw the axis
 * @param width
 */
export function drawSPYAxis (axis, yScale, width) {
  axis.attr('transform', 'translate(' + width + ', 0)')
    .call(d3.axisLeft(yScale).tickSizeOuter(0).tickArguments([8, '~s']))
}

/**
 * Places the graph's title.
 *
 * @param {*} g The d3 Selection of the graph's g SVG element
 * @param width
 */
export function placeSPTitle (g, width, height) {
  g.append('text')
    .attr('class', 'title')
    .attr('x', width / 2)
    .attr('y', height + 60)
    .attr('font-size', 16)
}

