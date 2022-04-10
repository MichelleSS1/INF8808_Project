/**
 * Sets the size of the SVG canvas containing the graph.
 *
 * @param {number} width The desired width
 * @param {number} height The desired height
 */
 export function setCanvasSize (selection, width, height) {
    selection.attr('width', width)
      .attr('height', height)
  }
