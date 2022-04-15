/**
 * Positions the x axis label and y axis label.
 *
 * @param {*} g The d3 Selection of the graph's g SVG element
 * @param {number} width The width of the graph
 * @param {number} height The height of the graph
 */
export function positionLabels (g, width, height) {
  // TODO : Position axis labels
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
  // TODO : Draw the bubble chart's circles
  // Each circle's size depends on its population
  // and each circle's color depends on its continent.
  // The fill opacity of each circle is 70%
  // The outline of the circles is white

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
    // .attr('transform', 'translate(' + 430 + ', 0)')
    // .attr('transform', 'translate(' + (-50) + ', 0)')

  chart.node()
}

/**
 * Update the title of the graph.
 *
 * @param {number} year The currently displayed year
 */
export function setTitleText () {
  // TODO : Set the title
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
