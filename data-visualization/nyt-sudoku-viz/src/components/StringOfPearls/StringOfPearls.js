import styles from '../StringOfPearls/StringOfPearls.module.css'

import { React, useRef, useEffect, useState } from 'react';
import { create, select, csv, scaleLinear, scaleQuantize, scaleOrdinal, style } from 'd3'
import Legend from '../Legend/Legend.js'

function MobilePreview({ wrapperRef=wrapperRef }) {
  const [ scrollX, setScrollX ] = useState(0)
  
  useEffect((event) => {
    const updateScroll = () => {
      if (wrapperRef.current) {
        setScrollX(wrapperRef.current.scrollLeft)
      }
    }

    const pearlsWrapperElem = wrapperRef.current // document.querySelector(`.${styles.pearlsWrapper}`)
    if (pearlsWrapperElem) {
      pearlsWrapperElem.addEventListener('scroll', updateScroll)
    }

    return () => {
      if (pearlsWrapperElem) {
        pearlsWrapperElem.removeEventListener('scroll', updateScroll);
      }
    }
  }, [wrapperRef])

  return (
  <div className={styles.sidewaysPreview}>
    <div style={{"transform": `translate(${Math.min(scrollX/6, 155-67)}px, 0`, "display": "flex", "alignItems": "center"}}>
      <div className={styles.leftArrow}></div>
      <div className={styles.currentView}></div>
      <div className={styles.rightArrow}></div>
    </div>
  </div>
  )
}

function StringOfPearls({ dataFile, scale, legendLabelLeft=null, legendLabelRight=null }) {
  
  const [ isMobile, setIsMobile ] = useState(window.innerWidth < 768 ? true : false)

  const height = isMobile ? 575 : 675
  const width = 'auto'
  
  const [ data, setData ] = useState([])
  const matrixRef = useRef()
  const wrapperRef = useRef()
  
  const svg = select(matrixRef.current)
  .append("svg")
  .attr("id", `${styles.stringOfTimesSVG}`)
  .attr("viewBox", [0, 0, width, height])
  .attr("width", width)
  .attr("height", height)
  
  var squareSize = isMobile ? 7.5 : 8.8
  var padding = 2
  
  // dataFile === 'garlandTimes' ? 'garlandTimes' : 'garlandMistakes'
  
  useEffect(() => {
    csv(dataFile).then(function(data) {
      data = data.valueOf()
      setData([...data])
    })
  }, [])

  let pearlsScale

  if (scale==="quantize")  {
    pearlsScale = scaleQuantize()
    .domain([0, 15])
    .range(["#FFD8AC", "#FFBC71", "#FB9B00", "#C56800", "#854B0A", "#502C05"])
  } else  {
    pearlsScale = scaleOrdinal()
    .domain(["0", "1"])
    .range(["#fef0d9", "#854B0A"])
  }

  // x-axis annotation note
  svg // select("#" + `${styles.stringOfTimesSVG}`)
  .append("g")
  .attr("class", `${styles.annotationText}`)
  .append("text")
  .attr("x", 48)
  .attr("y", 24)
  .text("Each column is a puzzle; each square is a cell I filled out")

  // y-axis annotation note
  svg // select("#" + `${styles.stringOfTimesSVG}`)
  .append("g")
  .attr("class", `${styles.annotationText}`)
  .append("text")
  .attr("x", 6)
  .attr("y", 36)
  .attr("text-orientation", "upright")
  .attr("writing-mode", "vertical-rl")
  .text("Puzzles are solved from top to bottom →")

  // add annotation line that connects the first
  // column to the note
  svg // select("#" + `${styles.stringOfTimesSVG}`)
  .append("g")
  .attr("class", `${styles.connector__lines}`)
  .append("path")
  .attr("d", "M 26 32 V 18 H 44")
  .attr("stroke", "#b30000")
  .attr("stroke-width", 1.5)
  .attr("fill", "none")

  // add rect that highlights the first column
  svg //select("#" + `${styles.stringOfTimesSVG}`)
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
  .attr("transform", (d, i) => `translate(${i * (squareSize + padding) + 2}, 28)`)

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
  .attr("class", (d) => `square`)
  .attr("width", squareSize)
  .attr("height", squareSize)
  .attr("cell-index", (d) => d)
  .attr("fill", (d) => pearlsScale(d))
  .attr("display", (d) => (d === "" ? "none" : "block"))
  .attr("y", (d, i) => i * (squareSize + padding))
  .attr("z-index", -1)

  return (
  <div>
    <div className={styles.pearlsHeader}>
      <div><h5>
        {
          scale==="quantize" ?
            "In most cases, I spend less time solving cells towards the end"
            : (
            <>I tend to make <span className={styles.mistakes}>mistakes</span> towards the end of puzzles</>
            )
          }
      </h5></div>
      {
          scale==="quantize" ?
          <Legend scale={pearlsScale} legendLabelLeft={legendLabelLeft} legendLabelRight={legendLabelRight} ticks="threshold" />
            :
            null
      }
    </div>

    <div className={styles.pearlsWrapper} ref={wrapperRef}>
      <div className={styles.pearlsFade}></div>
      <div className={styles.matrix} ref={matrixRef}></div>
      <MobilePreview wrapperRef={wrapperRef} />
    </div>
  </div>
  )
}

export default StringOfPearls