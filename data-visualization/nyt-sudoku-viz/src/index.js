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

const header = ReactDOM.createRoot(document.getElementById('header'))
header.render(
  <>
    <Header />
  </>
)

const histogram = ReactDOM.createRoot(document.getElementById('histogram'))
histogram.render(
  <>
    <Histogram />
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

// const prefilledGrid = ReactDOM.createRoot(document.getElementById('prefilledGrid'))
// // console.log(GetPrefilledData)
// prefilledGrid.render(
//   <>
//     <Grid
//       colorData={[148, 135, 139, 138, 138, 130, 127, 131, 122, 138, 125, 130, 116,
//         120, 127, 128, 118, 115, 137, 101, 116, 123, 116, 120, 114, 131,
//         111, 117, 125, 105, 120, 134, 107, 122, 114, 117, 110, 111, 119,
//         122, 131, 114, 100, 119, 109, 121, 109, 112, 102, 103, 105, 115,
//         104,  99, 119, 120, 109, 107, 115, 115, 105,  98, 121, 102, 115,
//         128, 103,  90, 109, 115,  98,  96, 107, 104, 104, 107, 102,  99,
//         111,  94,  95]}
//       colors={['#FFF3B0', '#FFEB75', '#FFDA00', '#C5A900', '#9B8500']}
//     />
//   </>
// )

const stringOfTimes = ReactDOM.createRoot(document.getElementById('stringOfTimes'))
stringOfTimes.render(
  <>
    <StringOfPearls legendLabelLeft={"More time (in seconds) →"}/>
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
