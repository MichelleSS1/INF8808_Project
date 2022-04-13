/**
 * Generates the SVG element g which will contain the data visualisation.
 *
 * @param {object} margin The desired margins around the graph
 * @returns {*} The d3 Selection for the created g element
 */
 export function generateG (margin) {
    return d3.select('.graph')
      .select('svg')
      .append('g')
      .attr('id', 'graph-g')
      .attr('transform',
        'translate(' + margin.left + ',' + margin.top + ')')
  }
  
  /**
   * Sets the size of the SVG canvas containing the graph.
   *
   * @param {number} width The desired width
   * @param {number} height The desired height
   */
  export function setCanvasSize (id, width, height) {
    d3.select(id)
      .attr('width', width)
      .attr('height', height)
  }
  
