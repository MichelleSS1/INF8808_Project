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
  let bounds
  let svgSize
  let graphSize

  const margin = { top: 35, right: 35, bottom: 35, left: 35 }

  //first viz
  d3.csv('./data_offensive.csv', d3.autoType).then(function (data) {
    //TODO
    data = preproc.preprocessOffense(data)
    console.log(data)
    setSizing()
    build()

    /**
     *   This function handles the graph's sizing.
     */
    function setSizing () {
      bounds = d3.select('.graph').node().getBoundingClientRect()

      svgSize = {
        width: 1200,
        height: 400
      }

      graphSize = {
        width: (svgSize.width - margin.right - margin.left) / 3,
        height: svgSize.height - margin.bottom - margin.top
      }

      helper.setCanvasSize(svgSize.width, svgSize.height)
    }

    /**
     *   This function builds the graph.
     */
    function build () {
      var svgElement = d3.select('.chart-off-svg')
      viz.drawOffensiveRadarCharts(data, svgElement, graphSize.width, graphSize.height, margin)
    }

    window.addEventListener('resize', () => {
      setSizing()
      build()
    })
  })

  //second viz
  d3.csv('./data_defensive.csv', d3.autoType).then(function (data) {
    //TODO
    data = preproc.preprocessDefense(data)
    console.log(data)
    setSizing()
    build()

    /**
     *   This function handles the graph's sizing.
     */
    function setSizing () {
      bounds = d3.select('.graph').node().getBoundingClientRect()

      svgSize = {
        width: bounds.width,
        height: 550
      }

      graphSize = {
        width: svgSize.width - margin.right - margin.left,
        height: svgSize.height - margin.bottom - margin.top
      }

      // helper.setCanvasSize(svgSize.width, svgSize.height)
    }

    /**
     *   This function builds the graph.
     */
    function build () {
      var defensiveStatsChart = d3.select('.chart-def-svg')
      viz.drawDefensiveRadarChart(data, defensiveStatsChart)
    }

    window.addEventListener('resize', () => {
      setSizing()
      build()
    })
  }

  //third viz
  )
})(d3)
