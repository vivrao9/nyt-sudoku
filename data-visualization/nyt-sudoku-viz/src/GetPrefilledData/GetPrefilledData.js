// import {React,
//   useEffect,
//   useState} from 'react'
// import { count, csv,
//   sum } from 'd3'

  
//   function GetPrefilledData(difficulty = 'easy') {
//     const [prefilledData, setPrefilledData] = useState(new Array(81).fill(0))
    
//     function countNonZeroValues(puzzle, valueToCheck=0) {    
//       const copyOfPrefilledData = [...prefilledData]
      
//       puzzle.forEach((row) => {
//         row.forEach((value, index) => {
//           if (value !== valueToCheck) {
//             copyOfPrefilledData[index]++;
//           }
//         });
//       });
    
//       setPrefilledData(copyOfPrefilledData)
//       return prefilledData;
//     }

//     useEffect(() => {
//       csv('./data/' + difficulty + '.csv').then(data => {
//       data = data.puzzle
//       data = data.map((d) => Object.values(d).map(Number));
//       console.log(data)
//     })
//   }, [])
  
//   // countNonZeroValues(prefilledData)
//   return data;
// }

// export default GetPrefilledData;
