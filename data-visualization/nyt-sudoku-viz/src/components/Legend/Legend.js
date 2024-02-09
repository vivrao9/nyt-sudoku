import React from 'react'
import { range } from '../../utils'
import styles from '../Legend/Legend.module.css'

function Legend({scale, title=null}) {

  let tickSize = 6,
  width = 250,
  height = 44 + tickSize,
  marginBottom = 16 + tickSize,
  marginLeft = 0,
  ticks = width / 64,
  tickFormat,
  tickValues;

  const outputColors = Object.values(scale.range())
  const outputQuantiles = Object.values(scale.quantiles())

  console.log(outputQuantiles)

  return (
    <div className={styles.legend}>
    {outputColors.map((item, index) => {
      return <>
      <div className={styles.legendItem}>
        <div className={styles.legendColor} style={{'background-color': item}}/>
        <div className={styles.legendLabel}>{isNaN(outputQuantiles[index]) ? '' : (Math.round(outputQuantiles[index] * 100) / 100).toFixed(1)}</div>
      </div>
      </>
    })}
    </div>
  )
}

export default Legend;