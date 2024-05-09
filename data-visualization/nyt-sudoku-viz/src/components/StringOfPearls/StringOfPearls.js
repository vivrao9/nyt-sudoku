import { React, useRef, useEffect, useState } from 'react';
import { create, select, csv } from 'd3'
import stringData from '../../data/string_of_pearls_data.csv'

function StringOfPearls() {

  // 
  const [ isMobile, setIsMobile ] = useState(window.innerWidth < 768 ? true : false)

  const height = isMobile ? 725 : 575
  const width = 'auto'

  const [ data, setData ] = useState([])
  const matrixRef = useRef()

  const svg = select(matrixRef.current)
    .append('svg')
    .attr("viewBox", [0, 0, width, height])
    .attr("width", width)
    .attr("height", height)
    .attr("style", "max-width: 100%;")

  var squareSize = isMobile ? 3.5 : 5.7
  var padding = 2

  useEffect(() => {
    csv(stringData).then(function(data) {
      data = data.valueOf()
      setData([...data])
    })
  }, [])

  console.log(data)

  // write a function to fill squares based on some criteria
  function fillSquare(index) {
    if (index < 27) {
      return row_band_cols.top;
    } else if (index > 53) {
      return "#d3d3d3"; // row_band_cols.bottom;
    } else {
      return "#d3d3d3"; //row_band_cols.middle;
    }
  }

  // create object to store row band colors
  const row_band_cols = ({
    top: "#fff7bc",
    middle: "#fec44f",
    bottom: "#d95f0e"
  })

  // write function to identify section based on index
  function getSudokuSection(cellIndex) {
    // Check if the index is within the valid range (0 to 80)
    if (cellIndex < 0 || cellIndex > 80) {
      throw new Error("Invalid index. Cell index should be between 0 and 80.");
    }
  
    // Calculate the row and column indices from the cell index
    const rowIndex = Math.floor(cellIndex / 9);
    const colIndex = cellIndex % 9;
  
    // Determine the section based on the row and column indices
    const sectionRow = Math.floor(rowIndex / 3);
    const sectionCol = Math.floor(colIndex / 3);
  
    // Calculate the section number
    const sectionNumber = sectionRow * 3 + sectionCol;
  
    // Return the section number (zero-indexed)
    return sectionNumber;
  }

  // Create rows
  const puzzles = svg
  .selectAll(".col")
  .data(data)
  .enter()
  .append("g")
  .attr("class", "col")

  if (isMobile) {
    puzzles.attr("transform", (d, i) => `translate(0, ${i * (squareSize + padding)})`)
  } else {
    puzzles.attr("transform", (d, i) => `translate(${i * (squareSize + padding)}, 0)`)
  }

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
  .attr("grid-section", (d) => getSudokuSection(d))
  .attr("fill", (d) => fillSquare(d))
  .attr("display", (d) => (d === "" ? "none" : "block"))

  if (isMobile) {
    squares.attr("x", (d, i) => i * (squareSize + padding))
  } else {
    squares.attr("y", (d, i) => i * (squareSize + padding))
  }

  return (
  <div>
    <div className='matrix' ref={matrixRef}></div>
  </div>
  )
}

export default StringOfPearls