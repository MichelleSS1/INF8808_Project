/* eslint-disable jsdoc/require-returns-check */

/**
 * Defines the color scale used to determine the color of the circle markers.
 *
 * The color of each circle is determined based on the continent of the country it represents.
 *
 * The possible colors are determined by the scheme d3.schemeCategory10.
 *
 * @param {object} data The data to be displayed
 * @returns {*} The ordinal scale used to determine the color
 */
export function setColorScale () {
  var resultats = ['Victoire', 'Nul', 'Défaite']
  return d3.scaleOrdinal(d3.schemeCategory10).domain(resultats)
}

/**
 * Defines the log scale used to position the center of the circles in X.
 *
 * @param {number} width The width of the graph
 * @param {object} data The data to be used
 * @returns {*} The linear scale in X
 */
export function setXScale (width, data) {
  return d3.scaleLinear()
    .domain([
      d3.min(data, function (d) { return parseInt(d.Numero_Match) }),
      d3.max(data, function (d) { return parseInt(d.Numero_Match) + 1 })
    ])
    .range([0, width])
}

/**
 * Defines the log scale used to position the center of the circles in Y.
 *
 * @param {number} height The height of the graph
 * @param {object} data The data to be used
 * @returns {*} The linear scale in Y
 */
export function setYScale (height, data) {
  return d3.scaleLinear()
    .domain([
      d3.min(data, function (d) { return parseFloat(d.Masse_Salariale) }),
      d3.max(data, function (d) { return parseFloat(d.Masse_Salariale) })
    ])
    .range([height, 0])
}
