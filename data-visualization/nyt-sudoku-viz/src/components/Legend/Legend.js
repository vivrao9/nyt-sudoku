import React from 'react'
import { range } from '../../utils'
import styles from '../Legend/Legend.module.css'

function Legend({scale, title=null, legendLabelLeft=null, legendLabelRight=null}) {

  const outputColors = Object.values(scale.range())
  const outputQuantiles = Object.values(scale.quantiles())

  return (
    <div className={styles.legend}>
      <div className={styles.legendInstructions}>
        <div className={styles.legendLabelLeft}>{legendLabelLeft}</div>
        <div className={styles.legendLabelRight}>{legendLabelRight}</div>
      </div>
      <div className={styles.legendBlocks}>
        {outputColors.map((item, index) => {
          return <>
          <div className={styles.legendItem}>
            <div className={styles.legendColor} style={{'background-color': item}}/>
            <div className={styles.legendLabel}>{isNaN(outputQuantiles[index]) ? '' : (Math.round(outputQuantiles[index] * 100) / 100).toFixed(1)}</div>
          </div>
          </>
        })}
      </div>
    </div>
  )
}

export default Legend;