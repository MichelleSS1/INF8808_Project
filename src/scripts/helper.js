/**
 * Generates the SVG element g which will contain the data visualisation.
 *
 * @param {object} margin The desired margins around the graph
 * @returns {*} The d3 Selection for the created g element
 */
export function generateG1 (margin) {
  return d3.select('.graph')
    .select('#bubble-chart1')
    .append('g')
    .attr('id', 'graph-g1')
    .attr('transform',
      'translate(' + margin.left + ',' + margin.top + ')')
}

/**
 * @param margin
 * @returns {*} The d3 Selection for the created g element
 */
export function generateD1 (margin) {
  // var x = margin.left + width
  return d3.select('.graph')
    .select('#bubble-chart1')
    .append('g')
    .attr('id', 'graph-d1')
    .attr('transform',
      'translate(' + margin.left + ',' + margin.top + ')')
}

/**
 * @param margin
 * @returns {*} The d3 Selection for the created g element
 */
export function generateG2 (margin) {
  return d3.select('.graph')
    .select('#bubble-chart2')
    .append('g')
    .attr('id', 'graph-g2')
    .attr('transform',
      'translate(' + margin.left + ',' + margin.top + ')')
}

/**
 * @param margin
 * @returns {*} The d3 Selection for the created g element
 */
export function generateG3 (margin) {
  return d3.select('.graph')
    .select('#bubble-chart3')
    .append('g')
    .attr('id', 'graph-g3')
    .attr('transform',
      'translate(' + margin.left + ',' + margin.top + ')')
}

/**
 * Sets the size of the SVG canvas containing the graph.
 *
 * @param {number} width The desired width
 * @param {number} height The desired height
 */
export function setCanvasSize (width, height) {
  d3.select('#bubble-chart1')
    .attr('width', width)
    .attr('height', height)

  d3.select('#bubble-chart2')
    .attr('width', width)
    .attr('height', height)

  d3.select('#bubble-chart3')
    .attr('width', width)
    .attr('height', height)
}

/**
 * Appends an SVG g element which will contain the axes.
 *
 * @param {*} g The d3 Selection of the graph's g SVG element
 */
export function appendAxes1 (g) {
  g.append('g')
    .attr('class', 'x1 axis')

  g.append('g')
    .attr('class', 'y1 axis')
}

/**
 * @param g
 */
export function appendAxes2 (g) {
  g.append('g')
    .attr('class', 'x2 axis')

  g.append('g')
    .attr('class', 'y2 axis')
}

/**
 * @param g
 */
export function appendAxes3 (g) {
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
export function appendGraphLabels (g, width) {
  g.append('text')
    .attr('transform', 'translate(' + width + ',' + 500 + ')')
    .attr('transform', 'rotate(90)')
    .text('Masse salariale (millions deuros)')
    .attr('class', 'y axis-text')
    .attr('font-size', 12)

  g.append('text')
    .text('id de match')
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
export function drawXAxis (axis, xScale, height) {
  // d3.select('.x.axis')
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
export function drawYAxis (axis, yScale, width) {
  axis.attr('transform', 'translate(' + width + ', 0)')
    .call(d3.axisRight(yScale).tickSizeOuter(0).tickArguments([15, '~s']))
}

/**
 * Places the graph's title.
 *
 * @param {*} g The d3 Selection of the graph's g SVG element
 * @param width
 */
export function placeTitle (g, width) {
  g.append('text')
    .attr('class', 'title')
    .attr('x', width / 2)
    .attr('y', -20)
    .attr('font-size', 14)
}
