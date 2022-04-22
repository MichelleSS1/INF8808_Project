'use strict'

import * as helper from './scripts/helper.js'
import * as preproc from './scripts/preprocess.js'
import * as viz from './scripts/viz.js'
import * as scales from './scripts/scales.js'
import * as legend from './scripts/legend.js'
import * as hover from './scripts/hover.js'

import d3Tip from 'd3-tip'

/**
 * @file This file is the entry-point for the the code for the project for the course INF8808.
 * @author Équipe **
 * @version v1.0.0
 */

(function (d3) {
  
  let svgSize
  let graphSize

  const MIN_RC_HEIGHT = 450
  const MIN_RC_WIDTH = 800

  const MIN_SP_HEIGHT = 400
  const MIN_SP_WIDTH = 650

  /**
   *   This function handles the graph's sizing.
   */
  function setSizing(dim, selection, margin, isRadarChart) {
    
    svgSize = {
      width: dim.width,
      height: dim.height
    }

    const width = isRadarChart ? svgSize.width / 3 : svgSize.width
    const height = isRadarChart ? svgSize.height - 100 : svgSize.height

    graphSize = {
      width: width - margin.right - margin.left,
      height: height - margin.bottom - margin.top
    }

    helper.setCanvasSize(selection, svgSize.width, svgSize.height)
  }

  const tip = d3Tip().attr('class', 'd3-tip').html(function (d) { return hover.getContents(d) })
  d3.select('.chart-off-svg').call(tip)

  // first viz
  d3.csv('./data_offensive.csv', d3.autoType).then(function (data) {
    const marginRC1 = { top: 65, right: 35, bottom: 125, left: 35 }

    data = preproc.preprocessOffense(data)
    
    const bounds = d3.select('#chart-off').node().getBoundingClientRect();
    const selection = d3.select(".chart-off-svg");
    
    setSizing(
      {width: Math.max(MIN_RC_WIDTH, bounds.width * 0.8), height: Math.max(MIN_RC_HEIGHT, bounds.height)}, 
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
      legend.drawRCLegend(color, svgElement, graphSize.height, marginRC1)
      viz.addButtons(svgElement, graphSize.height, marginRC1)
    }

    window.addEventListener('resize', () => {
      const bounds = d3.select('#chart-off').node().getBoundingClientRect();
      const selection = d3.select(".chart-off-svg");
      setSizing(
        {width: Math.max(MIN_RC_WIDTH, bounds.width * 0.8), height: Math.max(MIN_RC_HEIGHT, bounds.height)}, 
        selection, marginRC1, true)
      buildRadarChart1()
    })
  })

  // second viz
  d3.csv('./data_defensive.csv', d3.autoType).then(function (data) {
    const marginRC2 = { top: 65, right: 35, bottom: 125, left: 35 }
    data = preproc.preprocessDefense(data)

    const bounds = d3.select('#chart-def').node().getBoundingClientRect();
    const selection = d3.select(".chart-def-svg");

    setSizing(
      {width: Math.max(MIN_RC_WIDTH, bounds.width * 0.8), height: Math.max(MIN_RC_HEIGHT, bounds.height)}, 
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
      legend.drawRCLegend(color, svgElement, graphSize.height, marginRC2)  
      viz.addButtons(svgElement, graphSize.height, marginRC2)
    }


    window.addEventListener('resize', () => {
      const bounds = d3.select('#chart-def').node().getBoundingClientRect();
      const selection = d3.select(".chart-def-svg");
      setSizing(
        {width: Math.max(MIN_RC_WIDTH, bounds.width * 0.8), height: Math.max(MIN_RC_HEIGHT, bounds.height)}, 
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

    const chartData = preproc.getBumpChartData(data);
    const leftTeamNames = preproc.getLeftTeamNames(data);
    const rightTeamNames = preproc.getRightTeamNames(data);
    const teamNames = preproc.getLeftTeamNames(data).sort();

    const xDomain = Object.keys(data)
    const bounds = d3.select('#chart-rank').node().getBoundingClientRect();
    const selection = d3.select(".chart-rank-svg");
    
    const mainG = helper.generateBCMainG(marginBC)
    const centerG = helper.appendBCCenter(mainG)

    helper.appendBCAxes(mainG)
    
    const width = xDomain.length * 60 + marginBC.left + marginBC.right + padding * 2;
    const height = leftTeamNames.length * 60 + marginBC.top + marginBC.bottom + padding * 2;
    setSizing(
      { width: Math.max(width, bounds.width * 0.8), 
        height: Math.max(height, bounds.height)
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

      helper.appendBCTeamSeries(chartData, teamNames.indexOf("Juventus"))

      viz.drawBCRankingLines(bxScale, byScale)

      viz.drawBCBumpNumber(bxScale, byScale, bumpRadius)

    }

    window.addEventListener('resize', () => {
      const bounds = d3.select('#chart-rank').node().getBoundingClientRect();
      const selection = d3.select(".chart-rank-svg");
      const width = xDomain.length * 100 + marginBC.left + marginBC.right + padding * 2;
      const height = leftTeamNames.length * 60 + marginBC.top + marginBC.bottom + padding * 2;
        setSizing(
        { width: Math.max(width, bounds.width * 0.8), 
          height: Math.max(height, bounds.height)
        }, selection, marginBC, false)
      buildBumpChart()
    })
  })

  /*********** AFFICHAGE SCATTER PLOT***********/
  const marginSP = {
    top: 40,
    right: 150,
    bottom: 75,
    left: 85
  }

  const radius = 4

  d3.csv('./totalSalaries2019.csv').then((data) => {
    const g1 = helper.generateSPG1(marginSP)

    const bounds = d3.select('#chart-eff').node().getBoundingClientRect();
    const selection = d3.select("#chart-eff-svg1");
    setSizing(
      {width: MIN_SP_WIDTH, 
      height: MIN_SP_HEIGHT}, 
      selection, marginSP, false
    )

    helper.appendSPAxes1(g1)
    helper.appendSPGraphLabels(g1, graphSize.width)
    helper.placeSPTitle(g1, graphSize.width, graphSize.height)
  
    viz.positionSPLabels(g1, graphSize.width, graphSize.height)

    viz.setSPTitleText()
      
    const chart1 = d3.select('#chart-eff-svg1').select('#graph-g1')
    const axisx1 = d3.select('.x1.axis')
    const axisy1 = d3.select('.y1.axis')
  
    const colorScale = scales.setSPColorScale()
    const xScale = scales.setSPXScale(graphSize.width, data)
    const yScale = scales.setSPYScale(graphSize.height, data)

    helper.drawSPXAxis(axisx1, xScale, graphSize.height)
    helper.drawSPYAxis(axisy1, yScale, graphSize.width)

    legend.drawSPLegend(g1, colorScale, -70, 0)

    buildScatterPlot(chart1, data, radius, colorScale, xScale, yScale)
    buildDensity(chart1, data, colorScale, 'Victoire', xScale, yScale)
    buildDensity(chart1, data, colorScale, 'Nul', xScale, yScale)
    buildDensity(chart1, data, colorScale, 'Défaite', xScale, yScale)
  })

  d3.csv('./totalSalaries2020.csv').then((data) => {
    const g2 = helper.generateSPG2(marginSP)

    const selection = d3.select("#chart-eff-svg2");
    setSizing(
      {width: MIN_SP_WIDTH, 
        height: MIN_SP_HEIGHT}, 
      selection, marginSP, false
    )

    helper.appendSPAxes2(g2)
    helper.appendSPGraphLabels(g2, graphSize.width)
    helper.placeSPTitle(g2, graphSize.width, graphSize.height)
  
    viz.positionSPLabels(g2, graphSize.width, graphSize.height)

    viz.setSPTitleText()

    const chart2 = d3.select('#chart-eff-svg2').select('#graph-g2')
    const axisx2 = d3.select('.x2.axis')
    const axisy2 = d3.select('.y2.axis')

    const colorScale = scales.setSPColorScale()
    const xScale = scales.setSPXScale(graphSize.width, data)
    const yScale = scales.setSPYScale(graphSize.height, data)

    helper.drawSPXAxis(axisx2, xScale, graphSize.height)
    helper.drawSPYAxis(axisy2, yScale, graphSize.width)

    buildScatterPlot(chart2, data, radius, colorScale, xScale, yScale)
    buildDensity(chart2, data, colorScale, 'Victoire', xScale, yScale)
    buildDensity(chart2, data, colorScale, 'Nul', xScale, yScale)
    buildDensity(chart2, data, colorScale, 'Défaite', xScale, yScale)
  })

  d3.csv('./totalSalaries2021.csv').then((data) => {
    const g3 = helper.generateSPG3(marginSP)

    const selection = d3.select("#chart-eff-svg3");
    setSizing(
      {width: MIN_SP_WIDTH, 
        height: MIN_SP_HEIGHT}, 
      selection, marginSP, false
    )
    
    helper.appendSPAxes3(g3)
    helper.appendSPGraphLabels(g3, graphSize.width)
    helper.placeSPTitle(g3, graphSize.width, graphSize.height)

    viz.positionSPLabels(g3, graphSize.width, graphSize.height)

    viz.setSPTitleText()

    const chart3 = d3.select('#chart-eff-svg3').select('#graph-g3')
    const axisx3 = d3.select('.x3.axis')
    const axisy3 = d3.select('.y3.axis')

    const colorScale = scales.setSPColorScale()
    const xScale = scales.setSPXScale(graphSize.width, data)
    const yScale = scales.setSPYScale(graphSize.height, data)

    helper.drawSPXAxis(axisx3, xScale, graphSize.height)
    helper.drawSPYAxis(axisy3, yScale, graphSize.width)

    buildScatterPlot(chart3, data, radius, colorScale, xScale, yScale)
    buildDensity(chart3, data, colorScale, 'Victoire', xScale, yScale)
    buildDensity(chart3, data, colorScale, 'Nul', xScale, yScale)
    buildDensity(chart3, data, colorScale, 'Défaite', xScale, yScale)
  })


  /**
   * This function builds the graph.
   *
   * @param chart
   * @param {object} data The data to be used
   * @param {number} transitionDuration The duration of the transition while placing the circles
   * @param width
   * @param radius
   * @param {*} colorScale The scale for the circles' color
   * @param {*} xScale The x scale for the graph
   * @param {*} yScale The y scale for the graph
   */
  function buildScatterPlot (chart, data, radius, colorScale, xScale, yScale) {
    viz.drawSPCircles(chart, data, radius, colorScale, xScale, yScale)
  }

  /**
   * @param chart
   * @param data
   * @param colorScale
   * @param xScaleDensity
   * @param yScaleDensity
   */
  function buildDensity (chart, data, colorScale, result, xScaleDensity, yScaleDensity) {
    viz.drawSPDensityLine(chart, data, colorScale, result, xScaleDensity, yScaleDensity)
  }
})(d3)
