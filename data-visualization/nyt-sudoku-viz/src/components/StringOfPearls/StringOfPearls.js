import styles from '../StringOfPearls/StringOfPearls.module.css'
import SidewaysScroll from '../../data/sideways_scroll.png'

import { React, useRef, useEffect, useState } from 'react';
import { create, select, csv, scaleLinear, scaleQuantize, style } from 'd3'
import Legend from '../Legend/Legend.js'
import garlandTimes from '../../data/garland__times.csv'

function StringOfPearls({ legendLabelLeft=null, legendLabelRight=null, scale, dataFile='garlandTimes' }) {

  const [ isMobile, setIsMobile ] = useState(window.innerWidth < 768 ? true : false)

  const height = isMobile ? 530 : 620
  const width = 'auto'

  const [ data, setData ] = useState([])
  const matrixRef = useRef()
  
  const svg = select(matrixRef.current)
  .append("svg")
  .attr("id", `${styles.stringOfTimesSVG}`)
  .attr("viewBox", [0, 0, width, height])
  .attr("width", width)
  .attr("height", height)
  
  var squareSize = isMobile ? 7.5 : 8.8
  var padding = isMobile ? 2 : 2
  
  // dataFile === 'garlandTimes' ? 'garlandTimes' : 'garlandMistakes'
  
  useEffect(() => {
    csv(garlandTimes).then(function(data) {
      data = data.valueOf()
      setData([...data])
    })
  }, [])
  
  const [ scrollX, setScrollX ] = useState(0)
  const wrapperRef = useRef()

  useEffect((event) => {
    const updateScroll = () => {
      console.log(wrapperRef.current.scrollLeft)
      setScrollX(wrapperRef.current.scrollLeft)
    }
    const pearlsWrapperElem = document.querySelector(`.${styles.pearlsWrapper}`)
    pearlsWrapperElem.addEventListener('scroll', updateScroll);
  }, [matrixRef, wrapperRef])

  let pearlsScale

  if (dataFile==='garlandTimes')  {
    pearlsScale = scaleQuantize()
    .domain([0, 15])
    .range(["#fef0d9", "#fdd49e", "#fdbb84", "#fc8d59", "#e34a33", "#b30000"])
  } else  {
    pearlsScale = scaleLinear()
    .domain([0, 1])
    .range(["#fef0d9", "#b30000"])
  }

  // x-axis annotation note
  select("#" + `${styles.stringOfTimesSVG}`)
  .append("g")
  .attr("class", `${styles.annotationText}`)
  .append("text")
  .attr("x", 48)
  .attr("y", 24)
  .text("Columns are puzzles; squares are cells")

  // y-axis annotation note
  select("#" + `${styles.stringOfTimesSVG}`)
  .append("g")
  .attr("class", `${styles.annotationText}`)
  .append("text")
  .attr("x", 6)
  .attr("y", 36)
  .attr("text-orientation", "upright")
  .attr("writing-mode", "vertical-rl")
  .text("Puzzles are filled out in this order →")

  // add annotation line that connects the first
  // column to the note
  select("#" + `${styles.stringOfTimesSVG}`)
  .append("g")
  .attr("class", `${styles.connector__lines}`)
  .append("path")
  .attr("d", "M 26 32 V 18 H 44")
  .attr("stroke", "#b30000")
  .attr("stroke-width", 1.5)
  .attr("fill", "none")

  // each square annotation note
  // select("#" + `${styles.stringOfTimesSVG}`)
  // .append("g")
  // .attr("class", `${styles.annotationText}`)
  // .append("text")
  // .attr("x", isMobile ? 108 : 48)
  // .attr("y", isMobile ? 536 : 564)
  // .text("Each square is a solved cell")

  // add annotation line that connects the
  // solved cell note to the square
  // const eachSquareAnnotationLine = select("#" + `${styles.stringOfTimesSVG}`)
  // .append("g")
  // .attr("class", `${styles.connector__lines}`)
  // .append("path")
  // .attr("stroke", "#b30000")
  // .attr("stroke-width", 1.5)
  // .attr("fill", "none")

  // if (isMobile) {
  //   eachSquareAnnotationLine.attr("d", "M 260 524 V 512")
  // } else {
  //   eachSquareAnnotationLine.attr("d", "M 225 560 H 290")
  // }

  // add rect that highlights the first column
  select("#" + `${styles.stringOfTimesSVG}`)
  .append("g")
  .attr("class", `${styles.connector__lines}`)
  .append("rect")
  .attr("x", 18.5)
  .attr("y", 32)
  .attr("width", 16)
  .attr("height", isMobile ? 415 : 471.5)
  .attr("stroke", "#b30000")
  .attr("stroke-width", 1.5)
  .attr("fill", "none")

  // add puzzle index #50
  svg
  .selectAll(".puzzlesIndices")
  .data(data)
  .enter()
  .append("g")
  .attr("class", `${styles.puzzleIndices}`)
  .append("text")
  .text((d, i) => i === 49 ? "#50" : null)
  .attr("transform", (d, i) => `translate(${28 + i * (squareSize + padding)}, 28)`)

  // add puzzle index #100
  svg
  .selectAll(".puzzlesIndices")
  .data(data)
  .enter()
  .append("g")
  .attr("class", `${styles.puzzleIndices}`)
  .append("text")
  .text((d, i) => i === 99 ? "#100" : null)
  .attr("transform", (d, i) => `translate(${4 + i * (squareSize + padding)}, 28)`)

  // Create rows
  const puzzles = svg
  .selectAll(".col")
  .data(data)
  .enter()
  .append("g")
  .attr("class", "col")
  .attr("transform", (d, i) => {
    if (i === 0)  {
      return `translate(${22 + i * (squareSize + padding)}, 36)`
    } else  {
      return `translate(${28+ i * (squareSize + padding)}, 36)`
    }})

  // Create squares within each row
  const squares = puzzles
  .selectAll(".square")
  .data((d) => Object.values(d))
  .enter()
  .append("rect")
  .attr("class", (d) => `square`) // (d) => `square ${d}`)
  .attr("width", squareSize)
  .attr("height", squareSize)
  .attr("cell-index", (d) => d)
  // .attr("grid-section", (d) => getSudokuSection(d))
  .attr("fill", (d) => pearlsScale(d))
  .attr("display", (d) => (d === "" ? "none" : "block"))
  .attr("y", (d, i) => i * (squareSize + padding)) // `${scrollPos}`}

  return (
  <div>
    <div className={styles.pearlsHeader}>
      <div>
        <h5>In most cases, I spend less time solving cells towards the end</h5>
        <p>Data suggests my last few steps are typically the fastest.</p>
      </div>
      <Legend scale={pearlsScale} legendLabelLeft={legendLabelLeft} legendLabelRight={legendLabelRight} ticks="threshold" />
  </div>

    <div className={styles.pearlsWrapper} ref={wrapperRef}>
      <div className={styles.matrix} ref={matrixRef}></div>
      <div className={styles.sidewaysPreview}>
        <div className={styles.currentView} style={{"transform": `translate(${Math.min(scrollX/6-5, 150-69)}px, 0`}}></div> 
      </div>
    </div>
  </div>
  )
}

export default StringOfPearls