import styles from './Grid.module.css'
import '../index.css'
import { range } from '../utils.js'
import { scaleQuantile, scaleQuantize, scaleDiverging, extent, select, color, format } from 'd3'
import { useEffect, useState, useRef } from 'react'
import { useHover } from '@uidotdev/usehooks'
import { legendColor } from 'd3-svg-legend'

import Legend from '../Legend/Legend.js'
// import Legend function from Observable
import { Runtime } from "https://cdn.jsdelivr.net/npm/@observablehq/runtime@4/dist/runtime.js";
import d3_colorLegend from "https://api.observablehq.com/@d3/color-legend.js?v=3";

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

    // create ref for each chart
    const legendRef = useRef(null)

    // create a D3 scales from min to max of the values
    // in the heatmap array argument
    const heatmap_scale = scaleQuantile()
    .domain(extent(colorData))
    .range(colors)

    // if (colorDiverging === true) {
    //   var heatmap_scale = scaleDiverging()
    //                     .domain(extent(colorData))
    //                     .range(colors)
    // } else {
    //   var heatmap_scale = scaleQuantile()
    //                     .domain(extent(colorData))
    //                     .range(colors)
    // }

    console.log(heatmap_scale.domain())

    // async function renderLegend(el) {
    //     // Get the value of the "legend" notebook cell, which is the function we want, which returns a DOM element
    //     const module = new Runtime().module(d3_colorLegend);
    //     const Legend = await module.value("Legend");

    //     // Finally, call `legend` with our options and append it to the container
    //     const element = Legend((heatmap_scale), {
    //         // title: "Unrepatriated remains reported by institutions",
    //         height: 50,
    //         width: 250,
    //         tickSize: 0,
    //         tickFormat: format(',')
    //     });
        
    //     window.onload = () => {
    //         el.appendChild(element);
    //     }

    // }
    
    // renderLegend(document.querySelector('.doks_grid'))

    var svg = select(legendRef.current)

    svg.append("g")
      .attr("class", "legendQuant")
      .attr("transform", "translate(20,20)")
    
    var legend = legendColor()
    .labelFormat(format(".2f"))
    .scale(heatmap_scale)
    .orient("horizontal")
    .labels(heatmap_scale.quantiles().map(d => Math.round(d * 10) / 10))
    .shapeWidth(48)
    
    svg.select(".legendQuant")
      .call(legend)

    return (
        // <div className='gridViz'>
        // <svg className='legendQuant' ref={legendRef} />
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
    // </div>
    )
}

export default Grid