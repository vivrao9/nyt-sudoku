function get_candidates(grid) {
  let candidates = [];
  for (let i = 0; i < grid.length; i++) {
    if (grid[i] === 0) {
      // create a set of candidate values for this cell
      let row = Math.floor(i / 9);
      let col = i % 9;
      let candidatesSet = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]);
      for (let j = 0; j < 9; j++) {
        // check row
        if (candidatesSet.has(grid[row*9 + j])) {
          candidatesSet.delete(grid[row*9 + j]);
        }
        // check column
        if (candidatesSet.has(grid[j*9 + col])) {
          candidatesSet.delete(grid[j*9 + col]);
        }
        // check square
        let square_row = Math.floor(row / 3)*3 + Math.floor(j / 3);
        let square_col = Math.floor(col / 3)*3 + (j % 3);
        if (candidatesSet.has(grid[square_row*9 + square_col])) {
          candidatesSet.delete(grid[square_row*9 + square_col]);
        }
      }
      // if there's exactly one candidate for this cell, add it to the list
      if (candidatesSet.size === 1) {
        candidates.push(i);
      }
    }
  }
  return candidates;
}
