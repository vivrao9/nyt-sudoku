// import module styles
import './Beeswarm.module.css'

// React imports
import {
  useState,
  useEffect,
  useRef,
  React
} from 'react'

// D3 imports
import {
  mean,
  max,
  csv,
  scaleLinear,
  select,
  axisBottom,
  forceCollide,
  forceSimulation,
  forceX,
  forceY
} from 'd3'

// Moment.js imports
import { duration } from 'moment' // https://momentjs.com/docs/#/durations/

// import range
import { range } from '../utils'

// declare variables at the top
const timesUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSoqnPWcu7Vi2cUAIcH78PFITa-gaVWhQVeEpM4X0Nc4Nd0fHZk98xb221AL3byyU-qAiO4UcZmGrMl/pub?gid=0&single=true&output=csv'

const width = window.innerWidth
const height = window.innerWidth < 768 ? 600: 400
const margin = { top: 20, right: 40, bottom: 20, left: 5 }
const innerHeight = height - margin.top - margin.bottom
const innerWidth = width - margin.left - margin.right
const circleRadius = 5

// beeswarm component
// with help from https://observablehq.com/@maritrinez/d3-brushable-timeline-beeswarm
function Beeswarm () {
  const [timesData, setTimesData] = useState(null)
  const chartRef = useRef(null)

  // create a function to color beeswarm dots differently
  // depending on when they were completed
  function colorDots ({ dot, index }) {
    if (index === (timesData.length - 1)) {
      return '#E40EFA'
    } else if (index >= (timesData.length - 6)) {
      return '#40C6F9'
    } else {
      return '#BBBBBB'
    }
  };

  // console.log("Data loaded:\n", timesData);

  useEffect(() => {
    // load data
    csv(timesUrl).then(data => {
      data = data.map(d => '00:' + d["Vivek's time"])
      data = data.map(d => duration(d))
      data = data.filter(d => d > 0)
      setTimesData(data)
    }).catch((error) => {
      console.error('Error fetching data:', error);
    });
  }, [])

  console.log(timesData)

  // if data is still loading, return a div that says that
  if (!timesData) {
    return (<div className="data-loading">Loading in data...</div>)
  }

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

  // create the concept of the x-axis
  // https://ghenshaw-work.medium.com/customizing-axes-in-d3-js-99d58863738b
  const xAxis = axisBottom(xScale)
    .tickValues(range(1, minutes).map(d => d * 60 * 1000))
    .tickSize(-innerHeight)
    .tickFormat(d => ((d / 60) / 1000) + ' min')

  // add x axis
  svg.append('g')
    .call(xAxis)
    .call(g => g.select('.domain').remove())
    .attr('transform', 'translate(0,' + (innerHeight - 20) + ')')

  // set up simulation
  const simulation = forceSimulation()
    .force('collide', forceCollide(d => circleRadius + 1))
    .force('x', forceX(d => xScale(d)).strength(10))
    .force('y', forceY(1).strength(10))

  // draw dots
  const dots = svg
    .append('g')
    .attr('transform', 'translate(0,' + innerHeight / 2 + ')')
    .selectAll('circle')
    .data(timesData)
    .enter()
    .append('circle')
    .attr('cx', d => {
      return xScale(d)
    })
    .attr('cy', innerHeight / 2)
    .attr('r', circleRadius)
    .attr('fill', (d, index) => colorDots(d, index))

  // simulate dots moving
  simulation.nodes(timesData)
    .on('tick', () => {
      dots
        .attr('cx', d => d.x)
        .attr('cy', d => d.y)
    })

  return <>
    <h4>After solving <code>{timesData.length}</code> sudokus, my average time is <code>{avgTimeAsStr}</code></h4>
    <p>They say you need to do something 10,000 times before you become an expert at it.</p>
    <svg ref={chartRef} width={innerWidth} height={innerHeight} />
  </>

}

export default Beeswarm