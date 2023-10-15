import styles from './Grid.module.css'
import '../index.css'
import { range } from '../utils.js'
import { scaleQuantize, extent } from 'd3'
import { useState } from 'react'

// =======================================================================
// start with Cell component
function Cell({ index, cellColor, cellValue }) {
    // create state to track if Cell is being hovered on
    const [isHovered, setIsHovered] = useState(false)

    // set state with list of neighbors
    const [listOfNeighbors, setListOfNeighbors] = useState([])

    function findNeighbors(index)    {
        // given a cell, find the (up to) eight neighboring cells
        // and return their indices
        // if a cell has fewer than eight neighbors (literal edge
        // cases, for example), return a 0
        let neighbors = [index - 10, index - 9, index - 8, index - 1, index + 1, index + 8, index + 9, index + 10]
        // console.log(neighbors)

        if (index % 9 === 0)   {
            neighbors[0] = 0
            neighbors[3] = 0
            neighbors[5] = 0
        }
        
        if (index % 9 === 8)   {
            neighbors[2] = 0
            neighbors[4] = 0
            neighbors[7] = 0
        }
        
        if (index < 9)   {
            neighbors[0] = 0
            neighbors[1] = 0
            neighbors[2] = 0
        }
        
        if (index > 71)   {
            neighbors[5] = 0
            neighbors[6] = 0
            neighbors[7] = 0
        }

        neighbors.map(neighbor => neighbor < 0 ? 0 : neighbor)
        neighbors.map(neighbor => neighbor > 80 ? 0 : neighbor)
        
        neighbors = neighbors.filter(x => x !== 0)

        setListOfNeighbors(neighbors)
    }
    
    function currentlyHovered({index})  {
        // flip isHovered state
        setIsHovered(!isHovered)

        if (isHovered)  {

            // const display_dict = Object.fromEntries(range(81).map(x => [x, 'none']))
            // const neighbors = findNeighbors(index)
            // neighbors.map(neighbor => display_dict[neighbor] = 'block')
            // display_dict[index] = 'block'
            // return display_dict
            console.log('index: ', index)
            console.log('listOfNeighbors: ', listOfNeighbors)
            console.log('neighbors: ', findNeighbors(index))
            findNeighbors(index)
        }

        else    {
            // return Object.fromEntries(range(81).map(x => [x, 'none']))
        }

        // who are this cell's immediate neighbors?
        // console.log(findNeighbors(index))

        // is data-cell=2 ever a neighbor?
        // console.log("List of neighbors includes 2? ", listOfNeighbors.includes(2))


    }

    // set cell style
    const cellStyle = { backgroundColor: cellColor || 'none',
                        color: cellColor === '#794B0A' ? 'white' : 'black'} // change color of text for color contrast

    // set paragraph style
    // const paraStyle = { display: opacities[index] }
    
    return <div className={`${styles.grid__cell}${isHovered ? ' active' : ''}${listOfNeighbors.includes(index) ? ' neighbor' : ''}`}
                key={index} // key or else React will yell at us
                data-cell={index} // data-cell to update/access this later
                style={cellStyle} // change style above to see it reflect here
                onMouseEnter={() => currentlyHovered({index})} // hover events
                onMouseLeave={() => currentlyHovered({index})}
                >
                    <p>
                        {Math.round((cellValue * 1000)) / 10 + '%'}
                    </p>
            </div>
}

// ======================================================================================
// create Grid component
function Grid({ heatmap = range(81), length }) {
    // convert string of list to list
    heatmap = JSON.parse(heatmap)
    
    // convert raw numbers of percentages
    heatmap = heatmap.map(item => item / length)
    
    // log to console
    // console.log(heatmap)
    // console.log(extent(heatmap))
    
    
    // create a D3 scales from min to max of the values
    // in the heatmap array argument
    var heatmap_scale = scaleQuantize()
                        .domain(extent(heatmap))
                        // .range(["#FBC990", "orange_-1", "orange_", "orange_1", "orange_2"])
                        .range(["#FBC990", "#FFAA4C", "#FA8400", "#C56800", "#854B0A"])

    // console.log(heatmap_scale(heatmap))
    
    return (
        <div className={styles.doks_grid}>
            {range(81).map((item, index) => {
                return <Cell key={index}
                        index={index}
                        cellColor={heatmap_scale(heatmap[index])}
                        cellValue={heatmap[index]} />
})}
        </div>
    )
}

export default Grid