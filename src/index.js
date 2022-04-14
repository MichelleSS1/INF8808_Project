'use strict'

import * as helper from './scripts/helper.js'
import * as preproc from './scripts/preprocess.js'
import * as viz from './scripts/viz.js'
import * as legend from './scripts/legend.js'
import * as hover from './scripts/hover.js'
import * as util from './scripts/util.js'

import * as d3Chromatic from 'd3-scale-chromatic'
import d3Tip from 'd3-tip'

/**
 * @file This file is the entry-point for the the code for TP3 for the course INF8808.
 * @author Équipe **
 * @version v1.0.0
 */

(function (d3) {
  let bounds
  let svgSize
  let graphSize

  const margin = { top: 65, right: 35, bottom: 35, left: 35 }

  const tip = d3Tip().attr('class', 'd3-tip').html(function (d) { return hover.getContents(d) })
  d3.select('.chart-off-svg').call(tip)

  //first viz
  d3.csv('./data_offensive.csv', d3.autoType).then(function (data) {
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
        width: 1300,
        height: 550
      }

      graphSize = {
        width: svgSize.width / 3 - margin.left - margin.right,
        height: svgSize.height - 100 - margin.bottom - margin.top
      }

      helper.setCanvasSize(d3.select('.chart-off-svg'), svgSize.width, svgSize.height)
    }

    /**
     *   This function builds the graph.
     */
    function build () {
      var color = d3.scaleOrdinal(['blue', 'orange'])
      color.domain(['Juventus', 'Top 7'])
      var svgElement = d3.select('.chart-off-svg')
      viz.drawOffensiveRadarCharts(data, svgElement, graphSize.width, graphSize.height, margin, tip)
      legend.drawLegend(color, svgElement)
      viz.addButtons(svgElement)
    }

    window.addEventListener('resize', () => {
      setSizing()
      build()
    })
  })

  //second viz
  d3.csv('./data_defensive.csv', d3.autoType).then(function (data) {
    data = preproc.preprocessDefense(data)
    setSizing()
    build()

    /**
     *   This function handles the graph's sizing.
     */
     function setSizing () {
      bounds = d3.select('.graph').node().getBoundingClientRect()

      svgSize = {
        width: 1300,
        height: 550
      }

      graphSize = {
        width: svgSize.width / 3 - margin.left - margin.right,
        height: svgSize.height - 100 - margin.bottom - margin.top
      }

      helper.setCanvasSize(d3.select('.chart-def-svg'), svgSize.width, svgSize.height)
    }

    /**
     *   This function builds the graph.
     */
    function build () {
      var color = d3.scaleOrdinal(['blue', 'orange'])
      color.domain(['Juventus', 'Top 7'])
      var svgElement = d3.select('.chart-def-svg')
      viz.drawDefensiveRadarChart(data, svgElement, graphSize.width, graphSize.height, margin, tip)
      legend.drawLegend(color, svgElement)  
      viz.addButtons(svgElement)
    }


    window.addEventListener('resize', () => {
      setSizing()
      build()
    })
  }

  //third viz
  )
})(d3)
