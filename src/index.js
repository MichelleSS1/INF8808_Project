'use strict'

import * as helper from './scripts/helper.js'
import * as scales from './scripts/scales.js'
import * as viz from './scripts/viz.js'
// import * as tooltip from './scripts/tooltip.js'
import * as legend from './scripts/legend.js'

// import d3Tip from 'd3-tip'

/**
 * @file This file is the entry-point for the the code for TP4 for the course INF8808.
 * @author Ursule Joelle Kanmegne Djoum
 * @version v1.0.0
 */

(function (d3) {
  // const margin = {
  //   top: 75,
  //   right: 200,
  //   bottom: 100,
  //   left: 80
  // }
  const margin = {
    top: 40,
    right: 150,
    bottom: 75,
    left: 85
  }

  let svgSize, graphSize

  setSizing()

  const g1 = helper.generateG1(margin)
  const g2 = helper.generateG2(margin)
  const g3 = helper.generateG3(margin)

  // const den1 = helper.generateD1(margin)
  // helper.appendAxesDen1(den1)
  // const den2 = helper.generateD2(margin)
  // const den3 = helper.generateD3(margin)

  helper.appendAxes1(g1)
  helper.appendGraphLabels(g1, graphSize.width)
  helper.placeTitle(g1, graphSize.width)

  viz.positionLabels(g1, graphSize.width, graphSize.height)

  helper.appendAxes2(g2)
  helper.appendGraphLabels(g2, graphSize.width)
  helper.placeTitle(g2, graphSize.width)

  viz.positionLabels(g2, graphSize.width, graphSize.height)

  helper.appendAxes3(g3)
  helper.appendGraphLabels(g3, graphSize.width)
  helper.placeTitle(g3, graphSize.width)

  viz.positionLabels(g3, graphSize.width, graphSize.height)

  viz.setTitleText()

  const radius = 4

  // helper.drawButton(g, currentYear === 2000 ? 2015 : 2000, graphSize.width)
  const chart1 = d3.select('#bubble-chart1').select('#graph-g1')
  // const chartDen1 = d3.select('#bubble-chart1').select('#graph-d1')
  const chart2 = d3.select('#bubble-chart2').select('#graph-g2')
  const chart3 = d3.select('#bubble-chart3').select('#graph-g3')

  const axisx1 = d3.select('.x1.axis')
  const axisy1 = d3.select('.y1.axis')
  // const axisxDen1 = d3.select('.xDen1.axis')
  // const axisyDen1 = d3.select('.yDen1.axis')

  const axisx2 = d3.select('.x2.axis')
  const axisy2 = d3.select('.y2.axis')

  const axisx3 = d3.select('.x3.axis')
  const axisy3 = d3.select('.y3.axis')

  d3.csv('./totalSalaries2019.csv').then((data) => {
    const colorScale = scales.setColorScale()
    const xScale = scales.setXScale(graphSize.width, data)
    const yScale = scales.setYScale(graphSize.height, data)

    helper.drawXAxis(axisx1, xScale, graphSize.height)
    helper.drawYAxis(axisy1, yScale, graphSize.width)
    // helper.drawXAxis(axisxDen1, xScale, graphSize.width)
    // helper.drawYAxis(axisyDen1, yScale, graphSize.width)

    legend.drawLegend(g1, colorScale, -70, 0)

    build(chart1, data, radius, colorScale, xScale, yScale)
    buildDensity(chart1, data, colorScale, 'Victoire', xScale, yScale)
    buildDensity(chart1, data, colorScale, 'Nul', xScale, yScale)
    buildDensity(chart1, data, colorScale, 'Défaite', xScale, yScale)
  })

  d3.csv('./totalSalaries2020.csv').then((data) => {
    const colorScale = scales.setColorScale()
    const xScale = scales.setXScale(graphSize.width, data)
    const yScale = scales.setYScale(graphSize.height, data)

    helper.drawXAxis(axisx2, xScale, graphSize.height)
    helper.drawYAxis(axisy2, yScale, graphSize.width)

    legend.drawLegend(g2, colorScale, -70, 0)

    build(chart2, data, radius, colorScale, xScale, yScale)
    buildDensity(chart2, data, colorScale, 'Victoire', xScale, yScale)
    buildDensity(chart2, data, colorScale, 'Nul', xScale, yScale)
    buildDensity(chart2, data, colorScale, 'Défaite', xScale, yScale)
  })

  d3.csv('./totalSalaries2021.csv').then((data) => {
    const colorScale = scales.setColorScale()
    const xScale = scales.setXScale(graphSize.width, data)
    const yScale = scales.setYScale(graphSize.height, data)

    helper.drawXAxis(axisx3, xScale, graphSize.height)
    helper.drawYAxis(axisy3, yScale, graphSize.width)

    legend.drawLegend(g3, colorScale, -70, 0)

    build(chart3, data, radius, colorScale, xScale, yScale)
    buildDensity(chart3, data, colorScale, 'Victoire', xScale, yScale)
    buildDensity(chart3, data, colorScale, 'Nul', xScale, yScale)
    buildDensity(chart3, data, colorScale, 'Défaite', xScale, yScale)
  })

  /**
   *   This function handles the graph's sizing.
   */
  function setSizing () {
    svgSize = {
      width: 650,
      height: 400
    }

    graphSize = {
      width: svgSize.width - margin.right - margin.left,
      height: svgSize.height - margin.bottom - margin.top
    }

    helper.setCanvasSize(svgSize.width, svgSize.height)
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
