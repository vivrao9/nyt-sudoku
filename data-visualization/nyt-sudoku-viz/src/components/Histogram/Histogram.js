import { React, useState, useRef, useEffect } from 'react';

import styles from './Histogram.module.css'

// D3 imports
import {
  mean,
  csv,
  scaleLinear,
  select,
  extent,
  axisBottom,
  bin,
  timeFormat,
  scaleQuantize
} from 'd3'

// import CSV file
import timesData from '../../data/times.csv'

// Moment.js imports
import { duration } from 'moment' // https://momentjs.com/docs/#/durations/

// define constants
const width = window.innerWidth < 768 ? 360 : 550
const height = 500
const margin = { top: 5, right: 15, bottom: 20, left: 15 }
const innerHeight = height - margin.top - margin.bottom
const innerWidth = width - margin.left - margin.right
const boxSize = 8.25
const numBins = 48
const plotBins = bin().thresholds(numBins)
const padding = 1

// create function
function Histogram() {
  const [ data, setData ] = useState([])
  const chartRef = useRef()
  
  useEffect(() => {
    csv(timesData).then(function(timesData) {
      timesData = timesData.map(d => '00:' + d["Vivek's time"])
      timesData = timesData.map(d => duration(d))
      timesData = timesData.filter(d => d > 0)
      timesData = timesData.valueOf()
      setData([...timesData])
    })
  }, [])

  // create the x scale
  const xScale = scaleLinear()
  .domain([0, numBins])
  .range([margin.left, innerWidth])
  
  // select and create SVG
  const svg = select(chartRef.current)
  .append('svg')
  .attr('width', width)
  .attr('height', height)
  .attr("id", "histogramSVG")
  
  // how many minutes do we have in here?
  const avgTime = duration(mean(data) / (60 * 1000), 'minutes')
  const avgTimeAsStr = avgTime.minutes() + ':' + avgTime.seconds()

  // create color function
  const col = scaleQuantize()
  .domain(extent(data))
  .range(['#FBC990', '#FFAA4C', '#FA8400', '#C56800'])

  // create cols for each histogram bin
  const histCols = svg.append('g')
  .selectAll(".col")
  .data(plotBins(data))
  .enter()
  .append('g')
  .attr('class', 'col')
  .attr("transform", (d, i) => `translate(${margin.left + i * (boxSize + padding)}, ${innerHeight - margin.bottom})`)

  // enter each col and append the appropriate number of squares
  histCols
  .selectAll(".square")
  .data(d => d) // plotBins(data) returns an array of arrays. Each array contains Durations.
  .enter()
  .append("rect")
  .attr("class", "square")
  .attr("y", (d, i) => -(i * (boxSize + padding))) // negative value makes it start from the bottom
  .attr("width", boxSize)
  .attr('height', boxSize)
  .attr("fill", "#FB9B00") //d => col(d))
  
  // create different scale for time-specific components
  const timeScale = scaleLinear()
  .domain(extent(data))
  .range([margin.left, innerWidth])

  const fmt = timeFormat("%-M")

  // define x-axis
  const gx = axisBottom(timeScale)
  .tickValues([duration(1, 'minutes'), duration(2, 'minutes'), duration(3, 'minutes'), duration(1, 'minutes'), duration(4, 'minutes'), duration(5, 'minutes'), duration(6, 'minutes'), duration(7, 'minutes'), duration(8, 'minutes')])
  .tickFormat(d => `${fmt(d)} mins`)
  .tickSizeOuter(0)
  
  // x-axis
  svg.append("g")
  .attr("transform", `translate(0,${innerHeight - margin.bottom + boxSize})`)
  .call(gx)

  // mean line
  svg
  .append("line")
  .attr("x1", timeScale(mean(data)))
  .attr("y1", innerHeight - margin.bottom + boxSize)
  .attr("x2", timeScale(mean(data)))
  .attr("y2", 0)
  .attr("stroke", "#272727")
  .style('stroke-width', "0.75px")

  // mean text
  svg.append("text").attr("x", timeScale(mean(data)) + 5).attr("y", 15).text("Average time: " + avgTimeAsStr).attr("class", `${styles.annotation}`)

  return <>
    <div ref={chartRef}>
      <h4>Between Feb. 2021 and Feb. 2024, I solved {data.length} sudokus, with an average time of {avgTimeAsStr}</h4>
    </div>
  </>
}

export default Histogram;