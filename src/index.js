'use strict'

import * as helper from './scripts/helper.js'
import * as preproc from './scripts/preprocess.js'
import * as viz from './scripts/viz.js'
import * as scales from './scripts/scales.js'
import * as legend from './scripts/legend.js'
import * as hover from './scripts/hover.js'

import d3Tip from 'd3-tip'

/**
 * @file This file is the entry-point for the the code for TP3 for the course INF8808.
 * @author Équipe **
 * @version v1.0.0
 */

(function (d3) {
  
  let svgSize
  let graphSize

  const MIN_CHART_HEIGHT = 450
  const MIN_CHART_WIDTH = 800

  /**
     *   This function handles the radar charts' sizing.
     */
   function setSizingRC(bounds, selection, margin) {

    svgSize = {
      width: bounds.width,
      height: bounds.height
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
    const height = isRadarChart ? svgSize.height - 100 : svgSize.width

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
    console.log(data)
    
    const bounds = d3.select('#chart-off').node().getBoundingClientRect();
    const selection = d3.select(".chart-off-svg");
    
    setSizingRC({width: Math.max(MIN_CHART_WIDTH, bounds.width * 0.8), height: Math.max(MIN_CHART_HEIGHT, bounds.height)}, selection, marginRC1)
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
      setSizingRC({width: Math.max(MIN_CHART_WIDTH, bounds.width * 0.8), height: Math.max(MIN_CHART_HEIGHT, bounds.height)}, selection, marginRC1)
      buildRadarChart1()
    })
  })

  // second viz
  d3.csv('./data_defensive.csv', d3.autoType).then(function (data) {
    const marginRC2 = { top: 65, right: 35, bottom: 125, left: 35 }
    data = preproc.preprocessDefense(data)

    const bounds = d3.select('#chart-def').node().getBoundingClientRect();
    const selection = d3.select(".chart-def-svg");

    setSizingRC({width: Math.max(MIN_CHART_WIDTH, bounds.width * 0.8), height: Math.max(MIN_CHART_HEIGHT, bounds.height)}, selection, marginRC2)
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
      setSizingRC({width: Math.max(MIN_CHART_WIDTH, bounds.width * 0.8), height: Math.max(MIN_CHART_HEIGHT, bounds.height)}, selection, marginRC2)
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
    }

    window.addEventListener('resize', () => {
      const bounds = d3.select('#chart-rank').node().getBoundingClientRect();
      const selection = d3.select(".chart-rank-svg");
      setSizing(bounds, selection, marginBC)
      buildBumpChart()
    })
  })

  /*********** AFFICHAGE BUBBLE CHART***********/
  const marginBC = {
    top: 40,
    right: 150,
    bottom: 75,
    left: 85
  }

  let svgSizeBC, graphSizeBC

  setSizingBC()

  const g1 = helper.generateG1(marginBC)
  const g2 = helper.generateG2(marginBC)
  const g3 = helper.generateG3(marginBC)

  helper.appendAxes1(g1)
  helper.appendGraphLabels(g1, graphSizeBC.width)
  helper.placeTitle(g1, graphSizeBC.width, graphSizeBC.height)

  viz.positionLabels(g1, graphSizeBC.width, graphSizeBC.height)

  helper.appendAxes2(g2)
  helper.appendGraphLabels(g2, graphSizeBC.width)
  helper.placeTitle(g2, graphSizeBC.width, graphSizeBC.height)

  viz.positionLabels(g2, graphSizeBC.width, graphSizeBC.height)

  helper.appendAxes3(g3)
  helper.appendGraphLabels(g3, graphSizeBC.width)
  helper.placeTitle(g3, graphSizeBC.width, graphSizeBC.height)

  viz.positionLabels(g3, graphSizeBC.width, graphSizeBC.height)

  viz.setTitleText()

  const radius = 4

  const chart1 = d3.select('#bubble-chart1').select('#graph-g1')
  const chart2 = d3.select('#bubble-chart2').select('#graph-g2')
  const chart3 = d3.select('#bubble-chart3').select('#graph-g3')

  const axisx1 = d3.select('.x1.axis')
  const axisy1 = d3.select('.y1.axis')

  const axisx2 = d3.select('.x2.axis')
  const axisy2 = d3.select('.y2.axis')

  const axisx3 = d3.select('.x3.axis')
  const axisy3 = d3.select('.y3.axis')

  d3.csv('./totalSalaries2019.csv').then((data) => {
    const colorScale = scales.setColorScale()
    const xScale = scales.setXScale(graphSizeBC.width, data)
    const yScale = scales.setYScale(graphSizeBC.height, data)

    helper.drawXAxis(axisx1, xScale, graphSizeBC.height)
    helper.drawYAxis(axisy1, yScale, graphSizeBC.width)

    legend.drawLegendBC(g1, colorScale, -70, 0)

    build(chart1, data, radius, colorScale, xScale, yScale)
    buildDensity(chart1, data, colorScale, 'Victoire', xScale, yScale)
    buildDensity(chart1, data, colorScale, 'Nul', xScale, yScale)
    buildDensity(chart1, data, colorScale, 'Défaite', xScale, yScale)
  })

  d3.csv('./totalSalaries2020.csv').then((data) => {
    const colorScale = scales.setColorScale()
    const xScale = scales.setXScale(graphSizeBC.width, data)
    const yScale = scales.setYScale(graphSizeBC.height, data)

    helper.drawXAxis(axisx2, xScale, graphSizeBC.height)
    helper.drawYAxis(axisy2, yScale, graphSizeBC.width)

    // legend.drawLegendBC(g2, colorScale, -70, 0)

    build(chart2, data, radius, colorScale, xScale, yScale)
    buildDensity(chart2, data, colorScale, 'Victoire', xScale, yScale)
    buildDensity(chart2, data, colorScale, 'Nul', xScale, yScale)
    buildDensity(chart2, data, colorScale, 'Défaite', xScale, yScale)
  })

  d3.csv('./totalSalaries2021.csv').then((data) => {
    const colorScale = scales.setColorScale()
    const xScale = scales.setXScale(graphSizeBC.width, data)
    const yScale = scales.setYScale(graphSizeBC.height, data)

    helper.drawXAxis(axisx3, xScale, graphSizeBC.height)
    helper.drawYAxis(axisy3, yScale, graphSizeBC.width)

    // legend.drawLegendBC(g3, colorScale, -70, 0)

    build(chart3, data, radius, colorScale, xScale, yScale)
    buildDensity(chart3, data, colorScale, 'Victoire', xScale, yScale)
    buildDensity(chart3, data, colorScale, 'Nul', xScale, yScale)
    buildDensity(chart3, data, colorScale, 'Défaite', xScale, yScale)
  })

  /**
   *   This function handles the graph's sizing.
   */
  function setSizingBC () {
    svgSizeBC = {
      width: 650,
      height: 400
    }

    graphSizeBC = {
      width: svgSizeBC.width - marginBC.right - marginBC.left,
      height: svgSizeBC.height - marginBC.bottom - marginBC.top
    }

    helper.setCanvasSizeBC(svgSizeBC.width, svgSizeBC.height)
  }

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
  function build (chart, data, radius, colorScale, xScale, yScale) {
    viz.drawCircles(chart, data, radius, colorScale, xScale, yScale)
  }

  /**
   * @param chart
   * @param data
   * @param colorScale
   * @param xScaleDensity
   * @param yScaleDensity
   */
  function buildDensity (chart, data, colorScale, result, xScaleDensity, yScaleDensity) {
    viz.drawDensityLine(chart, data, colorScale, result, xScaleDensity, yScaleDensity)
  }
})(d3)
