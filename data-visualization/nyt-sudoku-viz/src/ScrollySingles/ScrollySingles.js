import React, { useState } from 'react';
import { Scrollama, Step } from 'react-scrollama';
import Grid from '../Grid/Grid';
import styles from './ScrollySingles.module.css'

const ScrollamaDemo = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState(null);

  // This callback fires when a Step hits the offset threshold. It receives the
  // data prop of the step, which in this demo stores the index of the step.
  const onStepEnter = ({ data }) => {
    setCurrentStepIndex(data);
  };

  return (
    <div className={styles.entireScrolly}>
      <figure>
        <Grid heatmap='[148, 135, 139, 138, 138, 130, 127, 131, 122, 138, 125, 130, 116,
              120, 127, 128, 118, 115, 137, 101, 116, 123, 116, 120, 114, 131,
              111, 117, 125, 105, 120, 134, 107, 122, 114, 117, 110, 111, 119,
              122, 131, 114, 100, 119, 109, 121, 109, 112, 102, 103, 105, 115,
              104,  99, 119, 120, 109, 107, 115, 115, 105,  98, 121, 102, 115,
              128, 103,  90, 109, 115,  98,  96, 107, 104, 104, 107, 102,  99,
              111,  94,  95]' />
      </figure>

      <article>
        <Scrollama offset={0.9} onStepEnter={onStepEnter} debug>
          <Step data={1} key={1}>
            <div className={styles.scrollyCard}>
              <p>After all other options are eliminated, on average, it takes me xx steps to notice and fill out a cell. In other words, <b>it’s a proxy for how closely I’m paying attention to that cell or area</b>.</p>
            </div>
          </Step>

          <Step data={2} key={2}>
            <div className={styles.scrollyCard}>
              <p>But not all cells are created equally.</p>
              <p>When comparing each individual cell with the average number of steps it remained a naked single, it’s clear that I take longer to fill out naked singles in the center of the grid.</p>
            </div>
          </Step>

          <Step data={3} key={3}>
            <div className={styles.scrollyCard}>
              <p>This doesn’t mean I focus less on this section of the grid. It could mean that I’m caught up filling other naked singles before I get to the ones in the middle.</p>
              <p>Let’s reanalyze these cells using a different data point: average number of seconds to fill a cell.</p>
            </div>
          </Step>

          <Step data={4} key={4}>
            <div className={styles.scrollyCard}>
              <p>On average, I spend about four and a half seconds before I fill out a cell. But again, not all cells are created equally.</p>
            </div>
          </Step>

          <Step data={5} key={5}>
            <div className={styles.scrollyCard}>
              <p>When comparing the time per cell to the average time per cell, it looks like I spend less time on the right hand side of the puzzle. For cells that are in the bottom left and center, I tend to spend longer.</p>
            </div>
          </Step>
        </Scrollama>
      </article>
    </div>
  );
};

export default ScrollamaDemo;