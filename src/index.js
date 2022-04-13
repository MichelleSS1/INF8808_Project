'use strict'

import * as helper from './scripts/helper.js'
import * as preproc from './scripts/preprocess.js'
import * as viz from './scripts/viz.js'
import * as legend from './scripts/legend.js'
import * as hover from './scripts/hover.js'
import * as util from './scripts/util.js'

import * as d3Chromatic from 'd3-scale-chromatic'

/**
 * @file This file is the entry-point for the the code for TP3 for the course INF8808.
 * @author Équipe **
 * @version v1.0.0
 */

(function (d3) {
  
  let svgSize
  let graphSize

  /**
     *   This function handles the radar charts' sizing.
     */
   function setSizingRC(bounds, selection, margin, isRadarChart) {

    svgSize = {
      width: bounds.width,
      height: 450
    }

    graphSize = {
      width: svgSize.width / 3 - margin.left - margin.right,
      height: svgSize.height - margin.bottom - margin.top
    }

    helper.setCanvasSize(selection, svgSize.width, svgSize.height)
  }

  /**
   *   This function handles the graph's sizing.
   */
  function setSizing(dim, selection, margin, isRadarChart) {
    
    svgSize = {
      width: dim.width,
      height: dim.height
    }
    
    const width = isRadarChart ? svgSize.width / 3 : svgSize.width

    graphSize = {
      width: width - margin.right - margin.left,
      height: svgSize.height - margin.bottom - margin.top
    }

    helper.setCanvasSize(selection, svgSize.width, svgSize.height)
  }
  


  //first viz
  d3.csv('./data_offensive.csv', d3.autoType).then(function (data) {
    const marginRC1 = { top: 65, right: 35, bottom: 35, left: 35 }

    data = preproc.preprocessOffense(data)
    console.log(data)
    
    const bounds = d3.select('#chart-off').node().getBoundingClientRect();
    const selection = d3.select(".chart-off-svg");
    
    setSizing({width: bounds.width, height: 450}, selection, marginRC1, true)
    buildRadarChart1()

    /**
     *   This function builds the graph.
     */
    function buildRadarChart1() {
      var svgElement = d3.select('.chart-off-svg');
      viz.drawOffensiveRadarCharts(data, svgElement, graphSize.width, graphSize.height, marginRC1)
    }

    window.addEventListener('resize', () => {
      const bounds = d3.select('#chart-off').node().getBoundingClientRect();
      const selection = d3.select(".chart-off-svg");
      setSizing({width: bounds.width, height: 450}, selection, marginRC1, true)
      buildRadarChart1()
    })
  })

  //second viz
  d3.csv('./data_defensive.csv', d3.autoType).then(function (data) {
    const marginRC2 = { top: 65, right: 35, bottom: 35, left: 35 }
    data = preproc.preprocessDefense(data)

    const bounds = d3.select('#chart-def').node().getBoundingClientRect();
    const selection = d3.select(".chart-def-svg");

    setSizing({width: bounds.width, height: 450}, selection, marginRC2, true)
    buildRadarChart2()

    /**
     *   This function builds the graph.
     */
    function buildRadarChart2() {
      var svgElement = d3.select('.chart-def-svg')
      viz.drawDefensiveRadarChart(data, svgElement, graphSize.width, graphSize.height, marginRC2)
    }

    window.addEventListener('resize', () => {
      const bounds = d3.select('#chart-def').node().getBoundingClientRect();
      const selection = d3.select(".chart-def-svg");
      setSizing({width: bounds.width, height: 450}, selection, marginRC2, true)
      buildRadarChart2()
    })
  })


  d3.json('./serieA_ranking.json', d3.autoType).then(function (data) {
    const marginBC = { top: 35, right: 200, bottom: 35, left: 200 }
    const bumpRadius = 13

    const xScale = d3.scalePoint()
    const yScale = d3.scalePoint()

    const chartData = preproc.getChartData(data);
    const leftTeamNames = preproc.getLeftTeamNames(data);
    const rightTeamNames = preproc.getRightTeamNames(data);

    
    const bounds = d3.select('#chart-rank').node().getBoundingClientRect();
    const selection = d3.select(".chart-rank-svg");
    
    setSizing(bounds, selection, marginBC);
    buildBumpChart();
   
    /**
     *   This function builds the graph.
     */
    function buildBumpChart() {
      // viz.updateXScales(xScale, data, graphSize.width)
      // viz.updateYScales(yScale, neighborhoodNames, graphSize.height)

      // viz.drawXAxis(xScale)
      // viz.drawYAxis(yScale, graphSize.width)

      // viz.rotateXTicks()

      // viz.updateRects(xScale, yScale, colorScale)

      // hover.setRectHandler(xScale, yScale, hover.rectSelected, hover.rectUnselected, hover.selectTicks, hover.unselectTicks)

      // legend.draw(margin.left / 2, margin.top + 5, graphSize.height - 10, 15, 'url(#gradient)', colorScale)
    }

    window.addEventListener('resize', () => {
      const bounds = d3.select('#chart-rank').node().getBoundingClientRect();
      const selection = d3.select(".chart-rank-svg");
      setSizing(bounds, selection, marginBC)
      buildBumpChart()
    })
  }
  
  
  )
})(d3)
