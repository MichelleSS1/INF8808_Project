 
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
  return d3.select("#bc-center")
    .selectAll(".series")
    .data(chartData)
    .enter()
    .append("g")
    .attr("class", "series")
    .attr("opacity", 1)
    .attr("fill", function(d, i) { return i == juveIdx ? "gold" : "gray"})
    .attr("stroke", function(d, i) { return i == juveIdx ? "gold" : "gray"})
}