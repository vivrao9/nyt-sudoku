import { React, useState, useRef, useEffect } from 'react';

import styles from './Histogram.module.css'

// D3 imports
import {
  csv,
  scaleLinear,
  select,
  extent,
  axisBottom,
  bin,
  timeFormat,
  median
} from 'd3'

// Moment.js imports
import { duration } from 'moment' // https://momentjs.com/docs/#/durations/

// define constants
const width = window.innerWidth < 768 ? 360 : 550
const margin = { top: 5, right: 15, bottom: 20, left: 15 }
const innerWidth = width - margin.left - margin.right
const padding = 1

// create function
function Histogram({ dataFile, color="#FB9B00" }) {
  const [ data, setData ] = useState([])
  const chartRef = useRef()

  // define constants
  const numBins = color==="#FB9B00" ? 48 : 12
  const plotBins = bin().thresholds(numBins)
  const boxSize = color==="#FB9B00" ? 8.25 : 10
  const height = color==="#FB9B00" ? 545 : 450
  const innerHeight = height - margin.top - margin.bottom
  
  useEffect(() => {
    csv(dataFile).then(function(dataFile) {
      dataFile = dataFile.map(d => '00:' + d["times"])
      dataFile = dataFile.map(d => duration(d))
      dataFile = dataFile.filter(d => d > 0)
      dataFile = dataFile.valueOf()
      setData([...dataFile])
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
  
  // how many minutes do we have in here?
  let avgTime
  if (color==="#FB9B00")  {
    avgTime = duration(median(data) / (60 * 1000), 'minutes')
  } else {
    avgTime = duration(median(data) / (1000), 'seconds')
  }

  const avgTimeAsStr = avgTime.minutes() + ':' + String(avgTime.seconds()).padStart(2, '0')

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
  .attr("fill", color) //d => col(d))
  
  // create different scale for time-specific components
  const timeScale = scaleLinear()
  .domain(extent(data))
  .range([margin.left, innerWidth])

  // define x-axis
  let gx, fmt
  if (color==="#FB9B00")  {
    fmt = timeFormat("%-M")

    gx = axisBottom(timeScale)
    .tickValues([duration(1, 'minutes'), duration(2, 'minutes'), duration(3, 'minutes'), duration(1, 'minutes'), duration(4, 'minutes'), duration(5, 'minutes'), duration(6, 'minutes'), duration(7, 'minutes'), duration(8, 'minutes')])
    .tickFormat(d => `${fmt(d)} mins`)
    .tickSizeOuter(0)
  } else {
    fmt = timeFormat("%S")

    gx = axisBottom(timeScale)
    .tickValues([duration(5, 'seconds'), duration(15, 'seconds'), duration(25, 'seconds'), duration(35, 'seconds'), duration(45, 'seconds'), duration(55, 'seconds')])
    .tickFormat(d => `${fmt(d)} secs`)
    .tickSizeOuter(0)
  }
  
  // x-axis
  svg.append("g")
  .attr("transform", `translate(0,${innerHeight - margin.bottom + boxSize})`)
  .call(gx)

  if (color==="#FB9B00")  {
    // mean line
    svg
    .append("line")
    .attr("x1", timeScale(median(data)))
    .attr("y1", innerHeight - margin.bottom + boxSize)
    .attr("x2", timeScale(median(data)))
    .attr("y2", 0)
    .attr("stroke", "#272727")
    .style('stroke-width', "0.75px")

    // mean text
    svg.append("text").attr("x", timeScale(median(data)) + 5).attr("y", 15).text("Median time: " + avgTimeAsStr).attr("class", `${styles.annotation}`)
  }

  return <>
    <div ref={chartRef}>
      <h5>
        {
          color === "#FB9B00" ? (
            <>Between Feb. 2021 and Feb. 2024, I solved {data.length} sudokus, with a median time of {avgTimeAsStr}</>
          )
          : <>
          A majority of my mistakes take fewer than five seconds to correct
          </>
        }
      </h5>
    </div>
  </>
}

export default Histogram;