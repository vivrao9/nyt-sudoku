import { React, useState, useRef, useEffect } from 'react';

import styles from './FirstPlayBarChart.module.css'

// D3 imports
import {
  csv,
  scaleBand,
  scaleLinear,
  select,
  axisBottom,
  axisLeft,
} from 'd3'

// import CSV file
import freqData from '../../data/firstPlayFrequency.csv'

// define constants
const width = window.innerWidth < 768 ? 360 : 550
const height = 500
const margin = { top: 15, right: 15, bottom: 20, left: 25 }
const innerHeight = height - margin.top - margin.bottom
const innerWidth = width - margin.left - margin.right

// create function
function FirstPlayBarChart() {
  const [ data, setData ] = useState([])
  const freqRef = useRef()
  
  useEffect(() => {
    csv(freqData).then(function(freqData) {
      freqData = freqData.map(d => +d.frequency)
      setData([...freqData])
    })
  }, [])

  // create the x scale
  const xScale = scaleBand()
  .domain([...Array(data.length).keys()].map(d => d + 1))
  .range([margin.left, width - margin.right])
  .padding(0.15)

  // create the y scale
  const yScale = scaleLinear()
  .domain([0, 35])
  .range([innerHeight - margin.bottom, 0])
  
  // select and create SVG
  const svg = select(freqRef.current)
  .append('svg')
  .attr('width', width)
  .attr('height', height)
  .attr('viewBox', `0 0 ${width} ${height}`)
  .attr('preserveAspectRatio', 'xMidYMid meet')
  .attr("id", "freqSVG")
  
  // define x-axis
  const gx = axisBottom(xScale)
  .tickValues([...Array(data.length).keys().map(d => d + 1)])
  .tickSizeOuter(0)
  .tickSizeInner(0)
  .tickPadding(8)
  
  // Add the x-axis and label.
  svg.append("g")
  .attr("class", `${styles.annotation}`)
  .attr("transform", `translate(0, ${innerHeight - margin.bottom})`)
  .call(gx)
  .call(g => g.select("path").remove())
  
  // define y-axis
  const yx = axisLeft(yScale)
  .tickValues([10, 20, 30])
  .tickSize(-`${innerWidth + 24}`)
  
  // Add the y-axis and label.
  svg.append("g")
  .attr("class", `${styles.annotation}`)
  .attr("transform", `translate(${margin.left-4}, ${margin.top + 4 - margin.bottom})`)
  .call(yx)
  .call(g => g.select("path").remove())
  .call(g => g.selectAll("line").attr("class", `${styles.gridlines}`).attr("transform", `translate(-24,0)`))
  .call(g => g.selectAll("text").attr("dy", "-0.3rem"))

  // create cols for each number
  const histCols = svg.append('g')
  .selectAll()
  .data(data)
  .enter()
  .append('rect')
  .attr("x", (d, i) => xScale(i+1))
  .attr("y", `${innerHeight - margin.bottom}`)
  .attr("width", xScale.bandwidth())
  .attr("height", (d, i) => yScale(0) - yScale(d))
  .attr("fill", "#B0C4EF")
  .attr("transform", d => `translate(0, -${innerHeight - margin.bottom - yScale(d)})`) // don't know why this works
  
  return <>
    <div ref={freqRef}>
      <h5>My first play is the number "1" more than 35% of the time</h5>
      <p>The chart below shows the distribution of numbers I've started with.</p>
    </div>
  </>
}

export default FirstPlayBarChart;