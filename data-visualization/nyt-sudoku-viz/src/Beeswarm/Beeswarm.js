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
  csvParse,
  scaleLinear,
  select,
  axisBottom,
  forceCollide,
  forceSimulation,
  forceX,
  forceY,
  gray
} from 'd3'

// import {fs} from 'fs';

// Moment.js imports
import { duration } from 'moment' // https://momentjs.com/docs/#/durations/

// import range
import { range } from '../utils'

// declare variables at the top
const timesUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSoqnPWcu7Vi2cUAIcH78PFITa-gaVWhQVeEpM4X0Nc4Nd0fHZk98xb221AL3byyU-qAiO4UcZmGrMl/pub?gid=0&single=true&output=csv'

const width = 600
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

  // const interim_data = csvParse(fs.readFileSync("../data/gsheets_times.csv"));

  useEffect(() => {

    //trying to use async
    const fetchData = async () => {
      // load data
      csv(timesUrl).then(data => { // initially timesUrl
        data = data.map(d => '00:' + d["Vivek's time"])
        data = data.map(d => duration(d))
        data = data.filter(d => d > 0)
        setTimesData([...data])
        console.log("Data loaded:\n", timesData)  
    })
    }
    
    fetchData().catch((error) => {
      console.error('Error fetching data:', error);
    });
  }, [])

  // console.log(timesData)

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
    .attr('fill', "#999999")

  // simulate dots moving
  simulation.nodes(timesData)
    .on('tick', () => {
      dots
        .attr('cx', d => d.x)
        .attr('cy', d => d.y)
    })

  return <>
    <h4>Between Oct. 2020 and Jan. 2024, I solved <code>{timesData.length}</code> sudokus, with an average time of <code>{avgTimeAsStr}</code></h4>
    <svg ref={chartRef} width={innerWidth} height={innerHeight} />
  </>

}

export default Beeswarm