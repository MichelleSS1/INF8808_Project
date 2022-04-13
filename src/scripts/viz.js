import { range } from "./util";

/**
 * Updates the domain and range of the scale for both x axis
 *
 * @param {*} xScale The scale for the x axis
 * @param {*} bxScale The scale for the x pos in the bumpchart
 * @param {Array} xDomain The seasons
 * @param {Array} xRangeInterval The range interval for the x axis
 * @param {Array} bxRangeInterval The range interval for the x pos in the bumpchart
 */
export function updateXScales(xScale, bxScale, xDomain, xRangeInterval, bxRangeInterval) {
  xScale.domain(xDomain)
  .rangeRound(xRangeInterval);
  
  bxScale.domain(range(0, xDomain.length))
  .range(bxRangeInterval); 
}


/**
 * Updates the domain and range of the scale for both y axis
 *
 * @param {*} yScale The scale for the y axis
 * @param {*} byScale The scale for the y pos in the bumpchart
 * @param {Array} yDomain Teams names
 * @param {Array} xRangeInterval The range interval for the y axis
 * @param {Array} bxRangeInterval The range interval for the y pos in the bumpchart
 */
export function updateYScales(yScale, byScale, yDomain, yRangeInterval, byRangeInterval) {
  yScale.domain(yDomain)
  .rangeRound(yRangeInterval);
  
  byScale.domain(range(0, yDomain.length))
  .range(byRangeInterval); 
}
  