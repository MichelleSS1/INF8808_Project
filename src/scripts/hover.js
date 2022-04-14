/**
 * Defines the contents of the tooltip.
 *
 * @param {object} d The data associated to the hovered element
 * @returns {string} The tooltip contents
 */
 export function getContents (d) {
        
    return '<label id="tooltip-title"><b>' + d.label + '</b></label><br>' +
            '<label class="tooltip-value">'  + d.description + '</label><br>'
  
  }