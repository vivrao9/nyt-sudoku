// initialize an empty array to store values
order = []

// initialize an empty array to store the values in all cells
all_cells = []

// define a function to compare two arrays to see if
// all elements of the first array are present in the
// second array
var compare_arrays = function(arr_a, arr_b) {
    return arr_a.every((val) => arr_b.includes(val))
}

// make mutation observer
// and pass a callback function
// this callback function is triggered
// whenever there is a chnage to the element
const observer = new MutationObserver((event) => {
  event.forEach(each_event => {
      // console.log('print out target:\n');
      // console.log(each_event.target);
      
      // if (each_event.type == 'attributes') {
      //     console.log(each_event.target);
      //     console.log(Array.from(each_event.target.classList));
      // }

        if (compare_arrays(['su-cell', 'selected', 'guessed'], Array.from(each_event.target.classList))) {
                order.push(each_event.target.getAttribute('data-cell'));
            }
        })
      
});

// get reference to the su-board class
const board = document.querySelector(".su-board");

// attach an h1 element tag to the observer
// to look for changes
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
    }

// function to track when all cells have been filled
if (all_cells.indexOf('empty') == -1) {
    console.log(removeDuplicates(order).toString());
}
