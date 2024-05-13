import styles from './Grid.module.css'
import '../../index.css'
import { range } from  '../../utils'
import { scaleQuantile, extent, scaleThreshold } from 'd3'
import { useRef } from 'react'
import { useHover } from '@uidotdev/usehooks'
import { legendColor } from 'd3-svg-legend'
import Legend from '../Legend/Legend.js'

// =======================================================================
// start with Cell component
function Cell({ index, cellColor, cellValue, colors }) {

    // use hover hook
    const [ref, hovering] = useHover()

    // create state to track what cell is currently being hovered on
    // const [ hoveredOnCell, setHoveredOnCell ] = useState(null)

    // set hoverColor
    const textHoverColor = cellColor == colors.slice(-1) ? 'white' : 'black'

    // set cell style
    const cellStyle = { backgroundColor: cellColor || 'none',
                        color: textHoverColor} // change color of text for color contrast
    
    return <div className={`${styles.grid__cell}`} // ${listOfNeighbors.includes({index}) ? 'neighbor' : ''}`}
                key={index} // key or else React will yell at us
                ref={ref}
                data-cell={index} // data-cell to update/access this later
                style={cellStyle} // change style above to see it reflect here
                >
                    <p style={{display: hovering ? 'flex' : 'none',
                               margin: 'auto'}}>
                        {cellValue}
                    </p>
            </div>
}

// ======================================================================================
// create Grid component
function Grid({ colorData, colors, thresholds=[], legendLabelLeft=null, legendLabelRight=null, ticks="quantiles" }) {

    // create ref for each chart
    const legendRef = useRef(null)

    // create a D3 scales from min to max of the values
    // in the heatmap array argument
    // const heatmap_scale = scaleQuantile()
    // .domain(extent(colorData))
    // .range(colors)

    let heatmap_scale
    if (thresholds.length === 0) {
      heatmap_scale = scaleQuantile()
            .domain(extent(colorData))
            .range(colors)
    } else {
      heatmap_scale = scaleThreshold()
            .domain(thresholds)
            .range(colors)
    }

    return (
        <div>
        <Legend scale={heatmap_scale} legendLabelLeft={legendLabelLeft} legendLabelRight={legendLabelRight} ticks={ticks}/>
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
        </div>
    )
}

export default Grid