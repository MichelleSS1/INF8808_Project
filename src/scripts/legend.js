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