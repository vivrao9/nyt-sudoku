import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
// import App from './App'
import Header from './components/Header/Header.js' // './components/Header/Header.js'
import Histogram from './components/Histogram/Histogram.js'
import SectionBreak from './components/SectionBreak/SectionBreak.js'
import ScrollySingles from './components/ScrollySingles/ScrollySingles.js'
import RadioToggles from './components/RadioToggles/RadioToggles.js'
import StringOfPearls from './components/StringOfPearls/StringOfPearls.js'
import FirstPlayBarChart from './components/FirstPlayBarChart'

// load CSV files
import timesData from '../src/data/times.csv'
import garlandTimes from '../src/data/garland__times.csv' //'../../data/garland__times.csv'
import garlandMistakes from '../src/data/garland__mistakes.csv'
import mistakeTimes from '../src/data/timeSpentFixingMistakesByDate.csv'

const header = ReactDOM.createRoot(document.getElementById('header'))
header.render(
  <>
    <Header />
  </>
)

const histogram = ReactDOM.createRoot(document.getElementById('histogram'))
histogram.render(
  <>
    <Histogram dataFile={timesData}/>
  </>
)

const sectionBreak1 = ReactDOM.createRoot(document.getElementById('section-break-1'))
sectionBreak1.render(
  <>
    <SectionBreak />
  </>
)

const scrollSingles = ReactDOM.createRoot(document.getElementById('scrollySingles'))
scrollSingles.render(
  <>
    <ScrollySingles />
  </>
)

const radioToggles = ReactDOM.createRoot(document.getElementById('radioToggles'))
// console.log(GetPrefilledData)
radioToggles.render(
  <>
    <RadioToggles />
  </>
)

const stringOfTimes = ReactDOM.createRoot(document.getElementById('stringOfTimes'))
stringOfTimes.render(
  <>
    <StringOfPearls dataFile={garlandTimes} scale="quantize" legendLabelLeft={"Time to solve (in seconds) →"}/>
  </>
)

const firstPlay = ReactDOM.createRoot(document.getElementById('firstPlay'))
firstPlay.render(
  <>
    <FirstPlayBarChart />
  </>
)

const stringOfMistakes = ReactDOM.createRoot(document.getElementById('stringOfMistakes'))
stringOfMistakes.render(
  <>
    <StringOfPearls dataFile={garlandMistakes} scale="ordinal" legendLabelLeft={"More time (in seconds) →"}/>
  </>
)

const mistakeHistogram = ReactDOM.createRoot(document.getElementById('mistakeHistogram'))
mistakeHistogram.render(
  <>
    <Histogram dataFile={mistakeTimes} color="#BA81C5" />
  </>
)

const sectionBreak2 = ReactDOM.createRoot(document.getElementById('section-break-2'))
sectionBreak2.render(
  <>
    <SectionBreak />
  </>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// import reportWebVitals from './reportWebVitals';
// reportWebVitals();
