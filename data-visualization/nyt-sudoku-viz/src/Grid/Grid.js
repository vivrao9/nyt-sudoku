import styles from './Grid.module.css'
import '../index.css'
import { range } from '../utils.js'
import { scaleQuantize, extent, select, color } from 'd3'
import { useEffect, useState, useRef } from 'react'
import { useHover } from '@uidotdev/usehooks'

// prefilledData = {
//     'easy': [148, 135, 139, 138, 138, 130, 127, 131, 122, 138, 125, 130, 116,
//         120, 127, 128, 118, 115, 137, 101, 116, 123, 116, 120, 114, 131,
//         111, 117, 125, 105, 120, 134, 107, 122, 114, 117, 110, 111, 119,
//         122, 131, 114, 100, 119, 109, 121, 109, 112, 102, 103, 105, 115,
//         104,  99, 119, 120, 109, 107, 115, 115, 105,  98, 121, 102, 115,
//         128, 103,  90, 109, 115,  98,  96, 107, 104, 104, 107, 102,  99,
//         111,  94,  95],

//     'medium': 
        
// }


// =======================================================================
// start with Cell component
function Cell({ index, cellColor, cellValue }) {

    // use hover hook
    const [ref, hovering] = useHover()

    // create hover hook
    // useEffect(() => {
    //   const hoveredOnCell
    // })

//     // set state/style for hovered-on cell
//     const [ hoveredStyle, setHoveredStyle ] = useState('none')

    // create state to track what cell is currently being hovered on
    const [ hoveredOnCell, setHoveredOnCell ] = useState(null)

    // set cell style
    const cellStyle = { backgroundColor: cellColor || 'none',
                        color: cellColor === '#9B8500' ? 'white' : 'black'} // change color of text for color contrast
    
    return <div className={`${styles.grid__cell}`} // ${listOfNeighbors.includes({index}) ? 'neighbor' : ''}`}
                key={index} // key or else React will yell at us
                ref={ref}
                data-cell={index} // data-cell to update/access this later
                style={cellStyle} // change style above to see it reflect here
                // onMouseEnter={() => setHoveredOnCell(index)}
                // onMouseLeave={() => setHoveredOnCell(null)}
                >
                    <p style={{display: hovering ? 'flex' : 'none',
                               margin: 'auto'}}>
                        {cellValue}
                    </p>
            </div>
}

// ======================================================================================
// create Grid component
function Grid({ heatmap = range(81) }) {

    function findNeighbors(index)    {
        // given a cell, find the (up to) eight neighboring cells
        // and return their indices
        const gridSize = 9;
        const row = Math.floor(index / gridSize);
        const col = index % gridSize;
      
        const neighbors = [];
      
        for (let i = Math.max(0, row - 1); i <= Math.min(gridSize - 1, row + 1); i++) {
            for (let j = Math.max(0, col - 1); j <= Math.min(gridSize - 1, col + 1); j++) {
              const neighborIndex = i * gridSize + j;
              if (neighborIndex !== index && neighborIndex >= 0 && neighborIndex < gridSize * gridSize) {
                neighbors.push(neighborIndex);
              }
            }
          }
      
        return neighbors;
      }

    // convert string of list to list
    heatmap = JSON.parse(heatmap)
    
    // convert raw numbers of percentages
    heatmap = heatmap.map(item => item)    
    
    // create a D3 scales from min to max of the values
    // in the heatmap array argument
    var heatmap_scale = scaleQuantize()
                        .domain(extent(heatmap))
                        // .range(["#FBC990", "#FFAA4C", "#FA8400", "#C56800", "#854B0A"]) // oranges
                        .range(['#FFF3B0', '#FFEB75', '#FFDA00', '#C5A900', '#9B8500']) // yellows

    // console.log(heatmap_scale(heatmap))
    
    return (
        <div className={styles.doks_grid}>
            {range(81).map((item, index) => {
                return <Cell key={index}
                        index={index}
                        cellColor={heatmap_scale(heatmap[index])}
                        cellValue={heatmap[index]}
                        className={`${styles.grid__cell}`} />
})}
        </div>
    )
}

export default Grid