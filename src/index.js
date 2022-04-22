'use strict'

import * as helper from './scripts/helper.js'
import * as preproc from './scripts/preprocess.js'
import * as viz from './scripts/viz.js'
import * as legend from './scripts/legend.js'
import * as hover from './scripts/hover.js'
import * as util from './scripts/util.js'

import d3Tip from 'd3-tip'

/**
 * @file This file is the entry-point for the the code for the project for the course INF8808.
 * @author Équipe **
 * @version v1.0.0
 */

(function (d3) {
  
  let svgSize
  let graphSize

  const MIN_CHART_HEIGHT = 450
  const MIN_CHART_WIDTH = 800

  /**
   *   This function handles the graph's sizing.
   */
  function setSizing(dim, selection, margin, isRadarChart) {
    
    svgSize = {
      width: dim.width,
      height: dim.height
    }
    
    const width = isRadarChart ? svgSize.width / 3 : svgSize.width
    const height = isRadarChart ? svgSize.height - 100 : svgSize.width

    graphSize = {
      width: width - margin.right - margin.left,
      height: height - margin.bottom - margin.top
    }

    helper.setCanvasSize(selection, svgSize.width, svgSize.height)
  }

  const tip = d3Tip().attr('class', 'd3-tip').html(function (d) { return hover.getContents(d) })
  d3.select('.chart-off-svg').call(tip)

  //first viz
  d3.csv('./data_offensive.csv', d3.autoType).then(function (data) {
    const marginRC1 = { top: 65, right: 35, bottom: 125, left: 35 }

    data = preproc.preprocessOffense(data)
    console.log(data)
    
    const bounds = d3.select('#chart-off').node().getBoundingClientRect();
    const selection = d3.select(".chart-off-svg");
    
    setSizing(
      {width: Math.max(MIN_CHART_WIDTH, bounds.width * 0.8), height: Math.max(MIN_CHART_HEIGHT, bounds.height)}, 
      selection, marginRC1, true)
    buildRadarChart1()

    /**
     *   This function builds the graph.
     */
    function buildRadarChart1 () {
      var color = d3.scaleOrdinal(['blue', 'orange'])
      color.domain(['Juventus', 'Top 7'])
      var svgElement = d3.select('.chart-off-svg')
      viz.drawOffensiveRadarCharts(data, svgElement, graphSize.width, graphSize.height, marginRC1, tip)
      legend.drawLegend(color, svgElement, graphSize.height, marginRC1)
      viz.addButtons(svgElement, graphSize.height, marginRC1)
    }

    window.addEventListener('resize', () => {
      const bounds = d3.select('#chart-off').node().getBoundingClientRect();
      const selection = d3.select(".chart-off-svg");
      setSizing(
        {width: Math.max(MIN_CHART_WIDTH, bounds.width * 0.8), height: Math.max(MIN_CHART_HEIGHT, bounds.height)}, 
        selection, marginRC1, true)
      buildRadarChart1()
    })
  })

  //second viz
  d3.csv('./data_defensive.csv', d3.autoType).then(function (data) {
    const marginRC2 = { top: 65, right: 35, bottom: 125, left: 35 }
    data = preproc.preprocessDefense(data)

    const bounds = d3.select('#chart-def').node().getBoundingClientRect();
    const selection = d3.select(".chart-def-svg");

    setSizing(
      {width: Math.max(MIN_CHART_WIDTH, bounds.width * 0.8), height: Math.max(MIN_CHART_HEIGHT, bounds.height)}, 
      selection, marginRC2, true)
    buildRadarChart2()

    /**
     *   This function builds the graph.
     */
    function buildRadarChart2 () {
      var color = d3.scaleOrdinal(['blue', 'orange'])
      color.domain(['Juventus', 'Top 7'])
      var svgElement = d3.select('.chart-def-svg')
      viz.drawDefensiveRadarChart(data, svgElement, graphSize.width, graphSize.height, marginRC2, tip)
      legend.drawLegend(color, svgElement, graphSize.height, marginRC2)  
      viz.addButtons(svgElement, graphSize.height, marginRC2)
    }


    window.addEventListener('resize', () => {
      const bounds = d3.select('#chart-def').node().getBoundingClientRect();
      const selection = d3.select(".chart-def-svg");
      setSizing(
        {width: Math.max(MIN_CHART_WIDTH, bounds.width * 0.8), height: Math.max(MIN_CHART_HEIGHT, bounds.height)}, 
        selection, marginRC2, true)
      buildRadarChart2()
    })
  })


  d3.json('./serieA_ranking.json', d3.autoType).then(function (data) {
    const marginBC = { top: 35, right: 200, bottom: 35, left: 200 }
    const bumpRadius = 13
    const padding = 25

    const xScale = d3.scalePoint()
    const bxScale = d3.scalePoint()
    const yScale = d3.scalePoint()
    const byScale = d3.scalePoint()

    const chartData = preproc.getChartData(data);
    const leftTeamNames = preproc.getLeftTeamNames(data);
    const rightTeamNames = preproc.getRightTeamNames(data);

    const xDomain = Object.keys(data)
    const bounds = d3.select('#chart-rank').node().getBoundingClientRect();
    const selection = d3.select(".chart-rank-svg");
    
    const mainG = helper.generateBCMainG(marginBC)
    const centerG = helper.appendBCCenter(mainG)

    helper.appendBCAxes(mainG)
    const series = helper.appendBCTeamSeries(chartData, preproc.getLeftTeamNames(data).sort().indexOf("Juventus"))
    
    const width = xDomain.length * 100 + marginBC.left + marginBC.right + padding * 2;
    const height = leftTeamNames.length * 60 + marginBC.top + marginBC.bottom + padding * 2;
    setSizing(
      { width: Math.min(width, bounds.width), 
        height: Math.min(height, bounds.height)
      }, 
      selection, marginBC, false
    );
    buildBumpChart();
   
    /**
     *   This function builds the graph.
     */
    function buildBumpChart() {
      const xRangeInterval = [padding, graphSize.width - padding]
      const yRangeInterval = [padding, graphSize.height - padding]

      viz.updateBCXScales(xScale, bxScale, xDomain, xRangeInterval)
      viz.updateBCYScales(yScale, byScale, leftTeamNames, yRangeInterval)

      viz.drawBCXAxis(xScale, graphSize.height)
      viz.drawBCYAxis(yScale, leftTeamNames, rightTeamNames, graphSize.width)

      viz.drawBCDashedLines(xDomain, bxScale, graphSize.height, padding)

      viz.drawBCRankingLines(chartData, bxScale, byScale)

      // viz.updateRects(xScale, yScale, colorScale)

      // hover.setRectHandler(xScale, yScale, hover.rectSelected, hover.rectUnselected, hover.selectTicks, hover.unselectTicks)

      // legend.draw(margin.left / 2, margin.top + 5, graphSize.height - 10, 15, 'url(#gradient)', colorScale)
    }

    window.addEventListener('resize', () => {
      const bounds = d3.select('#chart-rank').node().getBoundingClientRect();
      const selection = d3.select(".chart-rank-svg");
      const width = xDomain.length * 100 + marginBC.left + marginBC.right + padding * 2;
      const height = leftTeamNames.length * 60 + marginBC.top + marginBC.bottom + padding * 2;
        setSizing(
        { width: Math.min(width, bounds.width), 
          height: Math.min(height, bounds.height)
        }, selection, marginBC, false)
      buildBumpChart()
    })
  }
  
  
  )
})(d3)
