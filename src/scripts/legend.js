import d3Legend from 'd3-svg-legend'

/**
 * Draws the legend.
 *
 * @param {*} colorScale The color scale to use
 * @param {*} g The d3 Selection of the graph's g SVG element
 * @param {number} positionx the x position on the graph used to place the legend
 * @param {number} positiony the y position on the graph used to place the legend
 */
export function drawLegend (g, colorScale, positionx, positiony) {
  // TODO : Draw the legend using d3Legend
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
