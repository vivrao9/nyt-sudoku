import styles from './Grid.module.css'
import '../index.css'
import { range } from '../utils.js'
import { scaleQuantize, scaleDiverging, extent, select, color, legendColor, format } from 'd3'
import { useEffect, useState, useRef } from 'react'
import { useHover } from '@uidotdev/usehooks'
import legend from 'd3-svg-legend'

// =======================================================================
// start with Cell component
function Cell({ index, cellColor, cellValue, colors }) {

    // use hover hook
    const [ref, hovering] = useHover()

    // create state to track what cell is currently being hovered on
    const [ hoveredOnCell, setHoveredOnCell ] = useState(null)

    // set cell style
    const cellStyle = { backgroundColor: cellColor || 'none',
                        color: cellColor === colors.slice(-1) ? 'white' : 'black'} // change color of text for color contrast
    
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
function Grid({ colorData, colorDiverging=false, colors, text=null, hatchData=null }) {

    // create a D3 scales from min to max of the values
    // in the heatmap array argument
    if (colorDiverging === true) {
      var heatmap_scale = scaleDiverging()
                        .domain(extent(colorData))
                        .range(colors)
    } else {
      var heatmap_scale = scaleQuantize()
                        .domain(extent(colorData))
                        .range(colors)                
    }

    return (
        <>
        <div className={styles.doks_grid}>
            {range(81).map((item, index) => {
                return <Cell key={index}
                        index={index}
                        cellColor={heatmap_scale(colorData[index])}
                        cellValue={colorData[index]}
                        className={`${styles.grid__cell}`}
                        colors={colors} />
})}
        </div>
        </>
    )
}

export default Grid