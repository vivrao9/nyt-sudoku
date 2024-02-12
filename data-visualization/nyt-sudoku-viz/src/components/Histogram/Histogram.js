import { React, useState, useRef, useEffect } from 'react';

import styles from './Histogram.module.css'

// D3 imports
import {
  mean,
  max,
  csv,
  scaleLinear,
  select,
  axisBottom
} from 'd3'

// import CSV file
import timesData from '../../data/times.csv'

// Moment.js imports
import { duration } from 'moment' // https://momentjs.com/docs/#/durations/

// import range
import { range } from '../../utils'

const width = 600
const height = window.innerWidth < 768 ? 600: 500
const margin = { top: 20, right: 40, bottom: 20, left: 5 }
const innerHeight = height - margin.top - margin.bottom
const innerWidth = width - margin.left - margin.right
const boxSize = 5

function Histogram() {
  const chartRef = useRef()

  console.log(timesData)

  csv(timesData).then(function(timesData) {
    timesData = timesData.map(d => '00:' + d["Vivek's time"])
    timesData = timesData.map(d => duration(d))
    timesData = timesData.filter(d => d > 0)
    return timesData
  })

console.log(timesData)

    // create the x scale
    const xScale = scaleLinear()
    .domain([0, max(timesData)])
    .range([0, innerWidth])
    
    const svg = select(chartRef.current)
    .append('svg')
    .attr('width', innerWidth)
    .attr('height', innerHeight)
    
    // how many minutes do we have in here?
    const minutes = Math.floor(max(timesData) / (60 * 1000))
    const avgTime = duration(mean(timesData) / (60 * 1000), 'minutes')
    const avgTimeAsStr = avgTime.minutes() + ':' + avgTime.seconds()
  
    svg.append('g')
    .selectAll('rect')
    .data(timesData)
    .join("rect")
    .attr("width", boxSize)
    .attr('height', boxSize)
    .attr('x', d => xScale(d))
    .attr('y', (d, index) => innerHeight - index)
    .attr('class', 'square')

  return <>
    <h4>Between Oct. 2020 and Feb. 2024, I solved <code>{timesData.length}</code> sudokus, with an average time of <code>{avgTimeAsStr}</code></h4>
    <svg ref={chartRef} width={innerWidth} height={innerHeight} />
  </>
}

export default Histogram;