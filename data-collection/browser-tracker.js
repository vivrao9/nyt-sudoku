// written by Vivek Rao in January 2023
// create a browser extension that tracks how a user fills out the NYTimes
// sudoku grid and store that data for later analysis.

// initialize an empty array to store values
// this array stores which data cell in the grid was filled
// it is filled in order
// e.g., if the array is [14, 17, 51], cell 14 was first filled, then
// cell 17, and then 51
// it's important to note that the cells are zero-indexed,
// i.e., the first cell (top-left corner) is cell 0
order = [];

// create a second array that tracks the number of seconds elapsed
// before a change is detected in the grid
seconds_array = [];

// to do this, log the time when the page first loads
time_since_last_change = Date.now();

// testing!
console.log('testing!');

// pull date of the current sudoku
var doks_date = document.getElementsByClassName('pz-game-date')[0].textContent;

// define a function to compare two arrays to see if
// all elements of the first array are present in the
// second array
var compare_arrays = function(arr_a, arr_b) {
    return arr_a.every((val) => arr_b.includes(val))
};

// make mutation observer
// and pass a callback function
// this callback function is triggered
// whenever there is a chnage to the element
const observer = new MutationObserver((event) => {
  event.forEach(each_event => {

        // only push MutationRecords that have the following matching clases.
        // from manual observation, these are the classes associated with
        // the last changed cell. Pick out the data-cell number and insert
        // it into the array ```order```.
        if (compare_arrays(['su-cell', 'selected', 'guessed'], Array.from(each_event.target.classList))) {

          // the above line will return two MutationRecords that are nearly
          // identical, but we only need one. Filtering out below:
          if (each_event.attributeName == "aria-label") {
                // add the data-cell attribute of the changed cell to the order
                // array
                order.push(each_event.target.getAttribute('data-cell'));

                // add the number of elapsed seconds to seconds_array
                seconds_array.push(Math.floor(Date.now() - time_since_last_change)/1000);

                // reset the time_since_last_change variable to be the current
                // instant; the next time the previous line runs, it will be
                // the difference between two date objects
                time_since_last_change = Date.now();
            }
          }
        })
});

// get reference to the su-board class
const board = document.querySelector(".su-board");

// specify what we're looking for
const config = {
  attributes: true,
  // childList: true,
  subtree: true,
  // characterData: true,
};

// start listening (watching?)
observer.observe(board, config);

// define a function that runs when it is detected that all cells in the grid
// are filled, i.e., none are empty
function runWhenFinished() {
  // compile a JSON object with the data we need
  const json_to_push = `{"date": "${doks_date}", "order": [${order.toString()}], "times": [${seconds_array.toString()}]}`
  console.log(json_to_push);

  let xhr = new XMLHttpRequest();

  // enter server address
  let url = "http://192.168.0.188:8181/";

  // open a connection
  xhr.open("POST", url, true);

  // Set the request header i.e. which type of content you are sending
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.setRequestHeader("Connection", "close");

  // full send!
  xhr.send(JSON.stringify(json_to_push));

  // stop watching for changes
  observer.disconnect();

  // stop running checkFinished() every 2.5s
  clearInterval(keepCheckingIfFinished);
};

// function to track when all cells have been filled
function checkFinished() {
  // initialize an empty array to store the values in all cells
  all_cells = [];

  // read in all elements with .su-cell
  // these are simply cells in the grid/box
  const cells = document.getElementsByClassName('su-cell');

  Array.from(cells).forEach(cell => {
    all_cells.push(cell.getAttribute('aria-label'))});

  // if there are no more empty cells in the grid, i.e., when the puzzle is
  // complete, then execute below code.
  if (all_cells.indexOf('empty') === -1) {
    runWhenFinished();
  }
  // else {
  //   console.log('not done yet!');
  // }
};

var keepCheckingIfFinished = setInterval(checkFinished, 2500);
