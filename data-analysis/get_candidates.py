def get_candidates(grid):
    '''
    Last edited: 04/15/2023
    Written by ChatGPT, lightly edited by me.

    Parameters
    ----------
    grid : an array containing the NYT sudoku grid.

    Returns
    -------
    candidates : a list of data-cell values with exactly one possible value.

    '''
    candidates = []
    for i in range(len(grid)):
        if grid[i] == 0:
            # create a set of candidate values for this cell
            row, col = i // 9, i % 9
            candidates_set = set(range(1, 10))
            for j in range(9):
                # check row
                if grid[row*9 + j] in candidates_set:
                    candidates_set.remove(grid[row*9 + j])
                # check column
                if grid[j*9 + col] in candidates_set:
                    candidates_set.remove(grid[j*9 + col])
                # check square
                square_row, square_col = (row // 3)*3 + j // 3, (col // 3)*3 + j % 3
                if grid[square_row*9 + square_col] in candidates_set:
                    candidates_set.remove(grid[square_row*9 + square_col])
            # if there's exactly one candidate for this cell, add it to the list
            if len(candidates_set) == 1:
                candidates.append(i)
    return candidates