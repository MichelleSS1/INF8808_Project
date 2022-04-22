import d3Legend from 'd3-svg-legend'

/**
 * Draws the color legend.
 *
 * @param {*} colorScale The color scale used for the legend
 * @param {*} g The d3 Selection of the SVG g elemnt containing the legend
 */
export function drawLegend (colorScale, g, height, margin) {
  var legend = d3Legend
    .legendColor()
    .labelFormat(d3.format('.2f'))
    .title('Légende')
    .shape('circle')
    .shapeRadius(10)
    .scale(colorScale)

  g.append('g')
    .attr('class', 'legend')
    .attr('font-size', 16)
    .attr('transform', 'translate(0,' + (height + margin.bottom - 60) +')')
    .attr('font-family', 'Open Sans Condensed')
    .call(legend)
}

/**
 * Draws the legend.
 *
 * @param {*} colorScale The color scale to use
 * @param {*} g The d3 Selection of the graph's g SVG element
 * @param {number} positionx the x position on the graph used to place the legend
 * @param {number} positiony the y position on the graph used to place the legend
 */
 export function drawLegendBC (g, colorScale, positionx, positiony) {
  // For help, see : https://d3-legend.susielu.com/

  g.append('g')
    .attr('class', 'legendOrdinal')
    .attr('transform', 'translate(' + positionx + ',' + positiony + ')')
    .append('text')
    .attr('class', 'legend-title')

  var legendOrdinal = d3Legend.legendColor()
    .shape('path', d3.symbol().type(d3.symbolCircle).size(80)())
  // use cellFilter to hide the "e" cell
    .cellFilter(function (d) { return d.label !== 'e' })
    .scale(colorScale)

  g.select('.legendOrdinal')
    .call(legendOrdinal)

  g.select('.legendOrdinal')
    .select('text.legend-title')
    .attr('transform', 'translate(0, -20)')
    .text('Legend')
}