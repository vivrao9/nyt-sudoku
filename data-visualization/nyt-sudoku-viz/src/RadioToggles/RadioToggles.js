import { React, useState, useEffect } from 'react';
import styles from './RadioToggles.module.css'
import Grid from '../Grid/Grid';

function RadioToggles() {
  const easy_grid = [60, 59, 57, 57, 53, 51, 53, 49, 48, 54, 48, 54, 50,
    49, 51, 51, 48, 50, 55, 42, 44, 50, 49, 50, 47, 50,
    45, 48, 50, 46, 46, 55, 45, 51, 49, 44, 46, 48, 49,
    48, 52, 44, 47, 46, 45, 46, 46, 45, 44, 42, 42, 45,
    44, 41, 48, 49, 46, 44, 49, 46, 40, 44, 48, 46, 46,
    51, 43, 39, 45, 43, 38, 40, 39, 41, 40, 42, 39, 43,
    46, 42, 40]
  const med_grid = [27, 33, 26, 29, 28, 29, 30, 32, 34, 31, 28, 30, 28,
    34, 31, 31, 30, 29, 30, 30, 28, 33, 31, 30, 34, 34,
    31, 29, 29, 33, 31, 31, 31, 33, 33, 30, 31, 32, 35,
    27, 33, 34, 29, 28, 27, 34, 30, 30, 29, 31, 28, 31,
    27, 24, 27, 35, 34, 28, 29, 29, 27, 32, 28, 28, 24,
    29, 34, 27, 27, 32, 27, 29, 27, 26, 27, 28, 29, 28,
    25, 25, 28]
  const hard_grid = [30, 27, 29, 30, 32, 27, 32, 26, 29, 30, 30, 32, 27,
    29, 28, 31, 31, 33, 28, 31, 27, 34, 26, 31, 29, 34,
    30, 31, 35, 32, 26, 29, 30, 34, 30, 30, 34, 29, 30,
    32, 35, 27, 30, 32, 29, 27, 33, 30, 28, 28, 28, 28,
    28, 28, 30, 27, 33, 32, 28, 26, 31, 28, 25, 24, 30,
    29, 29, 31, 35, 28, 27, 27, 27, 29, 24, 26, 26, 30,
    26, 25, 24]
  const [ prefilledData, setPrefilledData ] = useState(easy_grid)

  // useEffect(() => {
  //   <Grid colorData={prefilledData} colors={['#FFF3B0', '#FFEB75', '#FFDA00', '#C5A900', '#9B8500']} />
  // }, [prefilledData])

  return (
    <>
      <div className={styles.radioToggles}>
        <input type="radio" id="easy" value="Easy" name="prefilledGridDifficulty" onChange={() => setPrefilledData(easy_grid)} defaultChecked />
        <label htmlFor="easy" defaultChecked>Easy</label>

        <input type="radio" id="medium" value="Medium" name="prefilledGridDifficulty" onChange={() => setPrefilledData(med_grid)} />
        <label htmlFor="medium">Medium</label>

        <input type="radio" id="hard" value="Hard" name="prefilledGridDifficulty" onChange={() => setPrefilledData(hard_grid)} />
        <label htmlFor="hard">Hard</label>
      </div>
      
      <Grid colorData={prefilledData} colors={['#FFF3B0', '#FFEB75', '#FFDA00', '#C5A900']} />
    </>
  )
}

export default RadioToggles;