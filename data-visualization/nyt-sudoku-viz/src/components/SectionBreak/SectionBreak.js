import React from 'react';
import styles from './SectionBreak.module.css'
import { range } from '../../utils';

function SectionBreak() {
  return (
  <div className={styles.section_break}>
    <div className={styles.small_square}></div>
    <div className={styles.big_square}>
      {range(4).map((d,i) => <div key={i}></div>)}
    </div>
    <div className={styles.small_square}></div>
  </div>
  );
}

export default SectionBreak;