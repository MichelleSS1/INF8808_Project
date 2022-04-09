import * as radarChart from './radar_chart'

/**
 * Calls the functions from radar_chart.js to build the radar
 * chart of the offensive stats.
 *
 * @param {*} data The data used to build the radar chart.
 * @param {*} element The SVG element where the radar chart will be built.
 */
export function drawOffensiveRadarCharts(data, element, width, height, margin) {
    var xCenter = width / 2
    var yCenter = height / 2

    // Erases charts so they can be rebuilt.
    radarChart.eraseAll(element)

    // Build container for charts.
    var container = element.append('g')
        .attr('transform', 'translate(' + margin.left + ' ' + margin.top + ')')

    // Build each chart separately.
    data.forEach(function(serie, i) {
        if (serie.Team === 'Juventus') {
            var xTranslation = i / 2 * width
            var chartContainer = container.append('g')
                .attr('transform', 'translate(' + xTranslation + ' 0)')

            radarChart.drawAxes(serie, chartContainer, xCenter, yCenter)
            radarChart.drawAxesLabel(serie, chartContainer, xCenter, yCenter)
            radarChart.drawTitle(serie, chartContainer, xCenter)
        }
    });
    
}

/**
 * Calls the functions from radar_chart.js to build the radar
 * chart of the defensive stats.
 *
 * @param {*} data The data used to build the radar chart.
 * @param {*} element The SVG element where the radar chart will be built.
 */
export function drawDefensiveRadarChart(data, element) {
    
}