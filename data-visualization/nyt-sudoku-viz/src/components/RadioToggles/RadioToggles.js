import { React, useState } from 'react';
import styles from './RadioToggles.module.css'
import Grid from '../Grid/Grid';

function RadioToggles() {
  const easy_grid = [60, 58, 57, 57, 52, 51, 53, 48, 48, 55, 48, 53, 50,
    49, 51, 51, 48, 50, 55, 42, 45, 49, 50, 50, 47, 50,
    44, 48, 50, 46, 46, 55, 45, 50, 49, 44, 47, 48, 49,
    48, 53, 43, 47, 45, 45, 45, 46, 44, 44, 42, 42, 45,
    44, 41, 49, 49, 46, 44, 49, 46, 40, 44, 48, 46, 46,
    51, 43, 39, 45, 43, 38, 41, 39, 41, 40, 41, 38, 43,
    46, 41, 41]
  const med_grid = [27, 33, 26, 29, 28, 29, 30, 32, 33, 31, 28, 30, 28,
    34, 32, 30, 30, 30, 30, 30, 27, 33, 31, 29, 34, 34,
    32, 29, 29, 33, 30, 32, 30, 33, 33, 30, 31, 32, 35,
    27, 33, 35, 29, 27, 27, 34, 30, 30, 28, 31, 28, 31,
    27, 24, 27, 35, 34, 28, 29, 29, 27, 31, 29, 28, 24,
    29, 33, 27, 27, 32, 27, 28, 27, 26, 27, 29, 30, 28,
    26, 25, 28]
  const hard_grid = [30, 27, 29, 29, 32, 28, 32, 26, 29, 31, 29, 32, 28,
    29, 28, 31, 32, 33, 29, 31, 27, 34, 26, 31, 29, 34,
    30, 31, 35, 32, 26, 29, 30, 35, 29, 31, 34, 29, 30,
    32, 35, 27, 30, 32, 30, 27, 33, 30, 28, 29, 28, 27,
    28, 28, 30, 27, 33, 32, 28, 26, 31, 28, 26, 24, 29,
    29, 29, 31, 34, 28, 28, 28, 27, 29, 24, 26, 25, 29,
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
      
      <Grid colorData={prefilledData} colors={['#FFF3B0', '#FFEB75', '#FFDA00', '#C5A900']} legendLabelLeft={"% of puzzles where this cell was prefilled →"}/>
    </>
  )
}

export default RadioToggles;