import React, { useState } from 'react';
import { Scrollama, Step } from 'react-scrollama';
import Grid from '../Grid/Grid';
import styles from './ScrollySingles.module.css'
import { range } from '../../utils';

const scrollyData = {
  0:  {
    colorData: [ 9.45, 10.35, 12.73, 13.32,  9.83,  8.79,  9.5 ,  9.03,  9.65,
      9.  , 13.45,  8.86,  9.46, 12.78, 12.87,  9.48,  9.12, 11.28,
     10.08, 11.4 , 11.23,  9.68, 11.  , 13.43, 10.63, 16.94, 12.07,
      9.88, 13.  , 12.78, 14.26, 10.  , 12.21, 12.16, 15.7 , 11.26,
     11.46, 12.57, 12.41,  9.38, 12.27, 11.86, 11.46, 14.75,  8.85,
     12.52, 12.81,  9.72, 15.53, 12.17, 15.1 , 12.  ,  8.95,  9.62,
     13.84, 12.68, 15.88, 10.65, 15.58, 13.14, 10.57, 10.14, 11.81,
      9.87,  9.42, 17.94, 10.17, 15.  ,  6.38, 11.43, 12.34, 15.83,
      9.4 , 14.3 , 10.14, 12.39, 17.71, 14.93, 14.52,  9.69,  9.7 ],
    colors: ['#EEAFF5', '#F37FFF', '#E40EFA', '#B206C4'],
    text: "Once a cell becomes a naked single, on average, it takes me 11.79 steps to fill it out.<br><br>But not all cells are created equally.",
    legendLabelLeft: "Is a naked single for longer →"
  },

  1:  {
    colorData: [-2.35, -1.45,  0.93,  1.52, -1.97, -3.01, -2.3 , -2.77, -2.15,
      -2.8 ,  1.65, -2.94, -2.34,  0.98,  1.07, -2.32, -2.68, -0.52,
      -1.72, -0.4 , -0.57, -2.12, -0.8 ,  1.63, -1.17,  5.14,  0.27,
      -1.92,  1.2 ,  0.98,  2.46, -1.8 ,  0.41,  0.36,  3.9 , -0.54,
      -0.34,  0.77,  0.61, -2.42,  0.47,  0.06, -0.34,  2.95, -2.95,
       0.72,  1.01, -2.08,  3.73,  0.37,  3.3 ,  0.2 , -2.85, -2.18,
       2.04,  0.88,  4.08, -1.15,  3.78,  1.34, -1.23, -1.66,  0.01,
      -1.93, -2.38,  6.14, -1.63,  3.2 , -5.42, -0.37,  0.54,  4.03,
      -2.4 ,  2.5 , -1.66,  0.59,  5.91,  3.13,  2.72, -2.11, -2.1 ],
    colorDiverging: false,
    colors: ['#FFEB75', '#FFF3B0', '#F5F5F5', '#D3D3D3', '#B206C4', '#8A0497'],
    text: "I take longer to fill out naked singles that are toward the bottom of the puzzle. This might mean I pay less attention to this part of the grid.",
    legendLabelLeft: "← Naked for fewer steps",
    legendLabelRight: "Naked for more steps →"
  },

  2:  {
    colorData: [-2.35, -1.45,  0.93,  1.52, -1.97, -3.01, -2.3 , -2.77, -2.15,
      -2.8 ,  1.65, -2.94, -2.34,  0.98,  1.07, -2.32, -2.68, -0.52,
      -1.72, -0.4 , -0.57, -2.12, -0.8 ,  1.63, -1.17,  5.14,  0.27,
      -1.92,  1.2 ,  0.98,  2.46, -1.8 ,  0.41,  0.36,  3.9 , -0.54,
      -0.34,  0.77,  0.61, -2.42,  0.47,  0.06, -0.34,  2.95, -2.95,
       0.72,  1.01, -2.08,  3.73,  0.37,  3.3 ,  0.2 , -2.85, -2.18,
       2.04,  0.88,  4.08, -1.15,  3.78,  1.34, -1.23, -1.66,  0.01,
      -1.93, -2.38,  6.14, -1.63,  3.2 , -5.42, -0.37,  0.54,  4.03,
      -2.4 ,  2.5 , -1.66,  0.59,  5.91,  3.13,  2.72, -2.11, -2.1 ],
    colorDiverging: false,
    colors: ['#FFEB75', '#FFF3B0', '#F5F5F5', '#D3D3D3', '#B206C4', '#8A0497'],
    text: "This could also mean I’m caught up solving other naked singles before I get to the ones at the bottom.<br><br>Let’s reanalyze these cells using a different data point: average number of seconds to fill a cell.",
    legendLabelLeft: "← Naked for fewer steps",
    legendLabelRight: "Naked for more steps →"
  },

  3:  {
    colorData: [3.43, 4.17, 4.89, 3.75, 4.45, 3.93, 3.46, 3.61, 3.97, 4.35, 5.21,
      4.72, 3.62, 3.56, 3.82, 3.58, 5.09, 4.29, 3.5 , 4.67, 4.39, 4.79,
      4.21, 4.19, 4.94, 4.6 , 4.98, 5.04, 4.03, 4.03, 5.39, 5.1 , 3.25,
      4.05, 3.96, 7.12, 4.05, 5.37, 4.9 , 4.93, 5.62, 5.38, 3.4 , 4.32,
      4.6 , 5.61, 5.52, 4.44, 5.16, 4.67, 5.29, 3.81, 4.69, 4.12, 3.86,
      3.59, 4.93, 4.84, 4.83, 3.9 , 4.17, 4.31, 5.93, 4.9 , 4.66, 4.87,
      5.33, 5.11, 3.79, 4.12, 4.18, 3.88, 4.35, 4.76, 4.48, 5.27, 4.78,
      5.51, 5.17, 4.23, 4.43],
    colors: ['#FBC990', '#FFAA4C', '#FA8400', '#C56800'],
    text: "On average, I spend about four and a half seconds before I fill out a cell.<br><br>But again, not all cells are created equally.",
    legendLabelLeft: "More seconds before solving →"
  },

  4:  {
    colorData: [-1.09, -0.35,  0.37, -0.77, -0.07, -0.59, -1.06, -0.91, -0.55,
      -0.17,  0.69,  0.2 , -0.9 , -0.96, -0.7 , -0.94,  0.57, -0.23,
      -1.02,  0.15, -0.13,  0.27, -0.31, -0.33,  0.42,  0.08,  0.46,
       0.52, -0.49, -0.49,  0.87,  0.58, -1.27, -0.47, -0.56,  2.6 ,
      -0.47,  0.85,  0.38,  0.41,  1.1 ,  0.86, -1.12, -0.2 ,  0.08,
       1.09,  1.  , -0.08,  0.64,  0.15,  0.77, -0.71,  0.17, -0.4 ,
      -0.66, -0.93,  0.41,  0.32,  0.31, -0.62, -0.35, -0.21,  1.41,
       0.38,  0.14,  0.35,  0.81,  0.59, -0.73, -0.4 , -0.34, -0.64,
      -0.17,  0.24, -0.04,  0.75,  0.26,  0.99,  0.65, -0.29, -0.09],
    colors: ['#c7eae5', '#f5f5f5', '#f6e8c3', '#dfc27d', '#bf812d', '#8c510a'],
    text: "Let's rank all the cells and focus on the ones where I spend more time.<br><br>You can see that I spend longer toward the middle and bottom of the grid.",
    legendLabelLeft: "← Less time",
    legendLabelRight: "More time →"
    
  },
}

const ScrollamaDemo = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0)

  // This callback fires when a Step hits the offset threshold. It receives the
  // data prop of the step, which in this demo stores the index of the step.
  const onStepEnter = ({ data }) => {
    setCurrentStepIndex(data)
  }

  return (
    <div className={styles.entireScrolly}>
      <figure>
        <Grid {...scrollyData[currentStepIndex]}/>
      </figure>

      <article>
        <Scrollama offset={0.3} onStepEnter={onStepEnter}>
          {range(Object.keys(scrollyData).length).map((item, index) => {
            return <Step data={index} key={index}><div className={styles.scrollyCard}><p dangerouslySetInnerHTML={{ __html: scrollyData[index]['text'] }}></p></div></Step>
          })}
        </Scrollama>
      </article>
    </div>
  );
};

export default ScrollamaDemo;