// initialize an empty array to store values
// this array stores which data cell in the grid was filled
// it is filled in order
// e.g., if the array is [14, 17, 51], cell 14 was first filled, then
// cell 17, and lastly 51
// it's extremely important to note that the cells are zero-indexed,
// i.e., the first cell (top-left corner) is cell 0
order = [];

// testing!
console.log('testing!');

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

        // only push MutationRecords that have the following matching clases
        // from manual observation, these are the classes associated with
        // the last changed cell. Pick out the data-cell number and insert
        // it into the array ```order```.
        // for some strange reason, each number os inserted twice, so we define
        // a function below to remove duplicates.
        if (compare_arrays(['su-cell', 'selected', 'guessed'], Array.from(each_event.target.classList))) {
                order.push(each_event.target.getAttribute('data-cell'));
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
observer.observe(board, config);

// function to remove duplicates
// https://www.geeksforgeeks.org/how-to-remove-duplicate-elements-from-javascript-array/
function removeDuplicates(arr) {
    return arr.filter((item,
        index) => arr.indexOf(item) === index);
};

function runWhenFinished() {
  // TODO: replace this line with a function. Ideally this function will
  // be a POST to the Pi, but will execute only once, i.e., not make a new
  // POST request every 2.5 seconds.
  console.log(removeDuplicates(order).toString());

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

// [1,2,9,18,36,5,77,8,38,12,19,14,13,57,22,23,11,49,40,67,58,41,53,35,74,60,62,44,69,73,65,70,20,10,28,29,24,15,59,50,75,72,54,61,78,79,48,52,51,6,7,33,42,43,34,39,30]
